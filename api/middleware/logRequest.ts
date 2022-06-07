import { NextFunction, Request, Response } from 'express';
import { requestLogger } from '../util/logger';

export const logRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  requestLogger.log('info', `${req.method} ${req.originalUrl}`);
  next();
};
