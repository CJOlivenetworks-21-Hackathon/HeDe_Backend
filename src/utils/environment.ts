require('dotenv').config()

export const server = {
  port: process.env.SERVER_PORT,
}

export const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  database: process.env.DB_DATABASE,
  database_dev: process.env.DB_DATABASE_DEV,
  database_test: process.env.DB_DATABASE_TEST,

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}