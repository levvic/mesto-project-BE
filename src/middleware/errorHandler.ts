import { NextFunction, Request, Response } from 'express';
import ERROR_CODE from '../utils/constants';

interface ICustomError extends Error {
  statusCode: number;
}

const errorHandler = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = ERROR_CODE.InternalServerError, message = 'На сервере произошла ошибка' } = err;

  res
    .status(statusCode)
    .send({ message });
  return next();
};

export default errorHandler;
