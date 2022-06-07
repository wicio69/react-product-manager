import { createLogger, format, Logger, transports } from 'winston';

enum LogFiles {
  HTTP_LOG_FILE = 'http.log',
  DEBUG_LOG_FILE = 'debug.log',
}

const httpLogFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase}]: ${message}`;
});

const debugFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase}]: ${message} 
  ${stack}`;
});

const timestampFormat: string = 'YYYY-MM-DD HH:mm:ss';

export const debugLogger: Logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    format.timestamp({
      format: timestampFormat,
    }),
    debugFormat
  ),
  transports: [
    new transports.File({ filename: LogFiles.DEBUG_LOG_FILE }),
    new transports.Console(),
  ],
});

export const requestLogger: Logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: timestampFormat,
    }),
    httpLogFormat
  ),
  transports: [
    new transports.File({ filename: LogFiles.HTTP_LOG_FILE }),
    new transports.Console(),
  ],
});
