package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	r "github.com/dancannon/gorethink"
)

type MessageToClient struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

type FindHandler func(string) (Handler, bool)

type Client struct {
	send          chan MessageToClient
	socket        *websocket.Conn
	findHandler   FindHandler
	session       *r.Session
	stopMap       map[int]chan bool
	activeChannel string
	author        string
	authorId      string
}

func (client *Client) NewStopChannel(handlerId int) chan bool {
	client.StopForKey(handlerId)
	stop := make(chan bool)
	client.stopMap[handlerId] = stop
	return stop
}

func (client *Client) StopForKey(chanKey int) {
	if stopChan, found := client.stopMap[chanKey]; found {
		stopChan <- true
		delete(client.stopMap, chanKey)
	}
}

func (client *Client) Write() {
	for msg := range client.send {
		fmt.Printf("%#v\n", msg)
		if err := client.socket.WriteJSON(msg); err != nil {
			break
		}
	}
	client.socket.Close()
}

func (client *Client) Read() {
	var message MessageToClient
	for {
		if err := client.socket.ReadJSON(&message); err != nil {
			break
		}

		if handler, found := client.findHandler(message.Name); found {
			handler(client, message.Data)
		}
	}
	client.socket.Close()
}

func (client *Client) Close() {
	for _, ch := range client.stopMap {
		ch <- true
	}
	close(client.send)
}

func NewClient(socket *websocket.Conn, findHandler FindHandler, session *r.Session) *Client {
	return &Client{
		send:        make(chan MessageToClient),
		socket:      socket,
		findHandler: findHandler,
		session:     session,
		stopMap:     make(map[int]chan bool),
	}
}
