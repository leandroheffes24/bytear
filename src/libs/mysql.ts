import mysql from "serverless-mysql";

const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined

export const conn = mysql({
    config:{
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: dbPort,
        database: process.env.DB_NAME,
    }
})