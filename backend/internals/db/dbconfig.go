package db

import "database/sql"

type PostgresDbCon struct {
	Db *sql.DB
}

func NewPostgresRepo(conn *sql.DB) *PostgresDbCon {

	return &PostgresDbCon{
		Db: conn,
	}
}
