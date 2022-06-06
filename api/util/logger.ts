import { createLogger, Logger, transports } from 'winston';

export const debugLogger: Logger = createLogger({
  transports: [
    new transports.File({ filename: 'debug.log' }),
    new transports.Console(),
  ],
});
