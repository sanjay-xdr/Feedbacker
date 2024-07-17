package db

import (
	"database/sql"

	"go.mongodb.org/mongo-driver/mongo"
)

type PostgresDbCon struct {
	DB      *sql.DB
	MongoDb *mongo.Client
}

func NewPostgresRepo(conn *sql.DB, mongoCon *mongo.Client) *PostgresDbCon {

	return &PostgresDbCon{
		DB:      conn,
		MongoDb: mongoCon,
	}
}
