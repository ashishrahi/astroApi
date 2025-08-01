import winston from 'winston'
import path from 'path'

const logDir = "logs";
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({stack: true})
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),
    new winston.transports.File({
        filename: path.join(logDir, "combined.log")
    })
    ]
})

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    )
}

export default logger