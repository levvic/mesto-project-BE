import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors';
import User from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => {
    res.send({ users });
  })
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          'Пользователь с указанным _id не найден.',
        );
      }
      res.send(user);
    })
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};

export const updateProfileInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user._id;

  return User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError' || err.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user._id;

  return User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError' || err.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};
