import { NextFunction, Request, Response } from 'express';

const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63ed36a0f41ac2dd30f87c0f',
  };
  next();
};

export default fakeAuth;
