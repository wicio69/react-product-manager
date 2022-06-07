import { createLogger, Logger, transports } from 'winston';

export const debugLogger: Logger = createLogger({
  transports: [
    new transports.File({ filename: 'debug.log' }),
    new transports.Console(),
  ],
});

export const requestLogger: Logger = createLogger({
  transports: [
    new transports.File({ filename: 'httpRequest.log' }),
    new transports.Console(),
  ],
});
