package main

import (
	"net/http"
	"github.com/gorilla/websocket"
	"fmt"
	r "github.com/dancannon/gorethink"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Handler func(*Client, interface{})

type Router struct {
	rules   map[string]Handler
	session *r.Session
}

func NewRouter(session *r.Session) *Router {
	return &Router{
		rules:   make(map[string]Handler),
		session: session,
	}
}

func (e *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		return
	}
	client := NewClient(socket, e.FindHandler, e.session)
	defer client.Close()
	go client.Write()
	client.Read()
	removeUser(client)
}

func (r *Router) FindHandler(msgName string) (Handler, bool) {
	handler, found := r.rules[msgName]
	return handler, found
}

func (r *Router) Handle(msgName string, handler Handler) {
	r.rules[msgName] = handler
}

func removeUser(client *Client) {
	go func() {
		err := r.Table("user").
			Get(client.authorId).
			Delete().
			Exec(client.session)
		if err != nil {
			fmt.Println("could not delete the user: " + err.Error())
			return
		}
		fmt.Println("deleted user: " + client.author)
	}()
}
