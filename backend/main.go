package main

import (
	"net/http"
	r "github.com/dancannon/gorethink"
	"log"
)

type Channel struct {
	Id   string `json:"id" gorethink:"id,omitempty"`
	Name string `json:"name" gorethink:"name"`
}

type User struct {
	Id   string `gorethink:"id,omitempty"`
	Name string `gorethink:"name"`
}

type Message struct {
	Author    string `gorethink:"author"`
	ChannelId string `gorethink:"channelId"`
	CreatedAt string `gorethink:"createdAt"`
	Id        string `gorethink:"id,omitempty"`
	Message   string `gorethink:"message"`
}

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "rtsupport",
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)

	router.Handle("channel add", addChannel)
	router.Handle("channel subscribe", subscribeChannel)
	router.Handle("channel unsubscribe", unsubscribeChannel)
	router.Handle("user add", addUser)
	router.Handle("user subscribe", subscribeUser)
	router.Handle("message unsubscribe", unsubscribeMessage)
	router.Handle("message subscribe", subscribeMessage)
	router.Handle("message add", addMessage)

	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
