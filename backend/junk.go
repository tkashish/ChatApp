package main
//
//import (
//	r "github.com/dancannon/gorethink"
//	"fmt"
//)
//
//type Message struct {
//	Author    string `gorethink:"author"`
//	ChannelId string `gorethink:"channelId"`
//	CreatedAt string `gorethink:"createdAt"`
//	Id        string `gorethink:"id,omitempty"`
//	Message   string `gorethink:"message"`
//}
//
//func main() {
//	session, _ := r.Connect(r.ConnectOpts{
//		Address:  "localhost:28015",
//		Database: "rtsupport",
//	})
//
//	messages, err := r.Table("message").
//		Filter(r.Row.Field("channelId").Eq("770c87a5-b1da-40ac-a921-1301a2103563")).
//		Changes(r.ChangesOpts{IncludeInitial:true}).Run(session)
//
//	fmt.Println(err)
//	var change r.ChangeResponse
//	for messages.Next(&change) {
//		fmt.Printf("%#v\n", change)
//	}
//}
