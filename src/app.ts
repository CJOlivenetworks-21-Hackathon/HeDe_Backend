import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser'

/*

import mainRouter from './app/routes/routes.index'
*/

import { ApiError, InternalError } from './core/responses/response.ERR'

import { Logger } from './utils/Logger'
import { server } from './utils/environment'
import { Database } from './config/database'


// Routers
import testRouter from './app/routes/routes.index'


import morgan = require('morgan')

class APP {
  
  private logger = new Logger()
  public app: express.Application

  constructor() {
    this.app = express()
    this.initModules()
    this.initRouters()
    this.initErrorHandlers()
  }

  public serverOn() {
    this.app.listen(server.port, () => {
      this.logger.info(`server running on port : ${server.port}`);
    }).on('error', (e) => this.logger.error(e.message))
  }

  private initModules() {
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json({ limit: '10mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

    this.app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    
      // Pass to next layer of middleware
      next();
    })
  }

  private initErrorHandlers() {
    this.app.use((req, res, next) => {
      res.status(404).json({
        error: 'Not Found'
      })
    })

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof ApiError) {
        ApiError.handle(err, res)
      } else {
        if (process.env.NODE_ENV === 'development') {
          this.logger.error(err.message)
          return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
      }
    })
  }

  public initRouters() {
    this.app.use('/test', testRouter)
  }

  public async attatchDBConnection() {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

    await Database.getConnection()
    .catch((error) => {
      this.logger.error(error)
    })
  }

}

export default APP