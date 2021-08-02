import expressWinston from 'express-winston'
import winston from 'winston'

const { createLogger, format, transports } = winston
const { combine, timestamp, colorize, printf, simple } = winston.format

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`
})

class Logger {

    private logger: winston.Logger

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                logFormat,
            )
        })

        if (process.env.ENV !== 'production') {
            this.logger.add(new transports.Console({
                format: combine(
                    colorize(),
                    simple()
                ),
            }))
        }
    }

    public info(msg: string) { this.logger.info(msg) }
    public error(errMsg: string) { this.logger.error(errMsg) }

    public getRequestLogger() {
        return expressWinston.logger({
            transports: [
                new winston.transports.Console(),
              ],
              format: combine(
                colorize(),
                simple(),
              ),
              meta: process.env.ENV !== 'production', // optional: control whether you want to log the meta data about the request (default to true)
              msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
              expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
              colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
              ignoreRoute(req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
        })
    }

    public getRequestErrorLogger() {
        return expressWinston.errorLogger({
            transports: [
              new winston.transports.Console(),
            ],
            format: combine(
              colorize(),
              simple(),
            ),
        })
    }

}

export { Logger }