import 'dotenv/config'
 
import { Logger } from './utils/Logger'
import APP from './app'

const logger = new Logger()

const App = new APP()
const dbconnect = ( async () => {
    await App.attatchDBConnection()
    App.serverOn()
    logger.info('Server Bootstrapping Succes.')
})
dbconnect()