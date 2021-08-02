import { ConnectionOptions } from 'typeorm'
import { db } from './src/utils/environment'

const dbConnectionOptions: ConnectionOptions[] = [
    {
        name: "production",
        type: "mariadb",
        database: db.database,
        synchronize: false,
        logging: true,
        entities: ["dist/entities/**/*.ts"],
        subscribers: ["dist/subscribers/**/*.ts"],
        migrations: ["dist/migrations/**/*.ts"],
        migrationsTableName: "migrations",
        cli: {
            entitiesDir: "src/entities",
            subscribersDir: "src/subscribers",
            migrationsDir: "src/migrations"
        },
        host: db.host,
        port: Number(db.port),
        username: db.user,
        password: db.password
        },
    {
        name: "development",
        type: "mariadb",
        database: 'dev_auth',
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: ["src/database/entities/**/*.ts"],
        subscribers: ["src/database/migrations/**/*.ts"],
        migrations: ["src/database/migrations/**/*.ts"],
        host: db.host,
        port: Number(db.port),
        username: db.user,
        password: db.password
    },
    {
        name: "test",
        type: "mariadb",
        database: 'test_auth',
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: ["src/database/entities/**/*.ts"],
        subscribers: ["src/database/migrations/**/*.ts"],
        migrations: ["src/database/migrations/**/*.ts"],
        host: db.host,
        port: Number(db.port),
        username: db.user,
        password: db.password
    }
]

export = dbConnectionOptions