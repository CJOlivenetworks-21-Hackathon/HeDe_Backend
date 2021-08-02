import EventEmitter = require('events')
import { createConnection, getConnectionOptions, getConnection } from 'typeorm'
import { Logger } from '../utils/Logger'

class Database {

    public static emitter: EventEmitter = new EventEmitter()
    public static isConnected = false
    public static logger: any = new Logger()

    public static async getConnection(callback = null, wait = false) {
        Database.handleConnectionError()
        return await Database.createConnection()
    }

    public static async closeConnection() {
        await getConnection().close().then(() => { Database.isConnected = false })
    }

    public static async createConnection() {
        const connectionOption = await getConnectionOptions(process.env.NODE_ENV)
        console.log(connectionOption)
        return await createConnection({...connectionOption, name: 'default'})
        .then(() => {
            Database.isConnected = true
            Database.logger.info('database connected successfully')
        }).catch((err: Error) => {
            console.log(err)
            Database.logger.error('database connection error...retrying')
            Database.emitter.emit('DB_CONNECT_ERROR')
        })
    }

    private static async handleConnectionError() {
        Database.emitter.on('DB_CONNECT_ERROR', async () => {
            Database.logger.error('database connection error...retrying')
            setTimeout(async () => {
                await Database.createConnection()
                }, 3000)
        })
    }
    
}

export { Database }