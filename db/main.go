package main

import (
	r "github.com/dancannon/gorethink"
	"log"
)

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
	})

	if err != nil{
		log.Fatalln(err)
	}
	dbName := "chatter"
	r.DBCreate(dbName).Exec(session)
	r.DB(dbName).TableCreate("channel").Exec(session)
	r.DB(dbName).TableCreate("message").Exec(session)
	r.DB(dbName).TableCreate("user").Exec(session)

}
