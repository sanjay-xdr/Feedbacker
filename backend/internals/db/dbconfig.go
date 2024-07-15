package db

import "database/sql"

type PostgresDbCon struct {
	DB *sql.DB
}

func NewPostgresRepo(conn *sql.DB) *PostgresDbCon {

	return &PostgresDbCon{
		DB: conn,
	}
}
