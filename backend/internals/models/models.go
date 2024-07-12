package models

import "time"

type User struct {
	Id        int
	FirstName string
	LastName  string
	Email     string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

//TODO: user and userForm have only 1 join
type UserForm struct {
	Id        int
	FormName  string
	UserId    int
	FormLink  string //this will be from the blob storage
	CreatedAt string
	UpdatedAt string
}
