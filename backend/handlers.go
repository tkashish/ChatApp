package main

import (
	"github.com/mitchellh/mapstructure"
	r "github.com/dancannon/gorethink"
	"fmt"
	"time"
)

const (
	CHANNEL_KEY = iota
	USER_KEY
	MESSAGE_KEY
)

func addChannel(client *Client, data interface{}) {
	var channel Channel
	err := mapstructure.Decode(data, &channel)
	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
		return
	}
	go func() {
		err = r.Table("channel").
			Insert(channel).
			Exec(client.session)
		if err != nil {
			client.send <- MessageToClient{"error", err.Error()}
		}
	}()
}

func subscribeChannel(client *Client, data interface{}) {
	result := make(chan r.ChangeResponse)
	stop := client.NewStopChannel(CHANNEL_KEY)

	cursor, err := r.Table("channel").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)

	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
	}

	go func() {
		var changeResponse r.ChangeResponse
		for cursor.Next(&changeResponse) {
			result <- changeResponse
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case changeResponse := <-result:
				if changeResponse.NewValue != nil && changeResponse.OldValue == nil {
					client.send <- MessageToClient{"channel add", changeResponse.NewValue}
					//} else if changeResponse.NewValue != nil && changeResponse.OldValue != nil {
					//
					//} else {
					println("send channel-add message")
				}

			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(CHANNEL_KEY)
}

func addUser(client *Client, data interface{}) {
	var user User
	err := mapstructure.Decode(data, &user)
	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
		return
	}
	client.author = user.Name
	go func() {
		response, err := r.Table("user").
			Insert(user).
			RunWrite(client.session)
		if err != nil {
			client.send <- MessageToClient{"error", err.Error()}
		}
		client.authorId = response.GeneratedKeys[0]
	}()
}

func subscribeUser(client *Client, data interface{}) {
	result := make(chan r.ChangeResponse)
	stop := client.NewStopChannel(USER_KEY)

	cursor, err := r.Table("user").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)

	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
	}

	go func() {
		var changeResponse r.ChangeResponse
		for cursor.Next(&changeResponse) {
			result <- changeResponse
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case changeResponse := <-result:
				fmt.Printf("%#v\n", changeResponse)
				if changeResponse.NewValue != nil && changeResponse.OldValue == nil {
					client.send <- MessageToClient{"user add", changeResponse.NewValue}
					println("send user-add message")
				} else if changeResponse.OldValue != nil {
					client.send <- MessageToClient{"user remove", changeResponse.OldValue}
					fmt.Println("send user-remove message")
				}

			}
		}
	}()
}

func unsubscribeMessage(client *Client, data interface{}) {
	client.StopForKey(MESSAGE_KEY)
}

func subscribeMessage(client *Client, data interface{}) {
	result := make(chan r.ChangeResponse)
	stop := client.NewStopChannel(MESSAGE_KEY)
	var activeChannel struct {
		ChannelId string `json:"channelId"`
	}
	err := mapstructure.Decode(data, &activeChannel)
	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
		return
	}

	client.activeChannel = activeChannel.ChannelId
	cursor, err := r.Table("message").
		Filter(r.Row.Field("channelId").Eq(activeChannel.ChannelId)).
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)

	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
	}

	go func() {
		var changeResponse r.ChangeResponse
		for cursor.Next(&changeResponse) {
			result <- changeResponse
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case changeResponse := <-result:
				client.send <- MessageToClient{"message add", changeResponse.NewValue}
				fmt.Println("sending Message to client")
			}
		}
	}()
}

func addMessage(client *Client, data interface{}) {
	var messageBody struct {
		Message string `json:"message"`
	}
	err := mapstructure.Decode(data, &messageBody)
	if err != nil {
		client.send <- MessageToClient{"error", err.Error()}
		return
	}

	message := Message{
		Author:    client.author,
		ChannelId: client.activeChannel,
		CreatedAt: time.Now().Format("2006-01-02 3:4:5 PM"),
		Message:   messageBody.Message,
	}
	go func() {
		err = r.Table("message").
			Insert(message).
			Exec(client.session)
		if err != nil {
			client.send <- MessageToClient{"error", err.Error()}
		}
	}()
}
