import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../utils/config';
import ERROR_CODE from '../utils/constants';
import {
  BadRequestError, DuplicateError, NotFoundError, ServerError,
} from '../errors';
import User from '../models/user';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 3600000 * 24,
        })
        .send({ token });
    })
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => {
    if (!users) {
      throw new ServerError(
        'Произошла ошибка при получении списка пользователей. Попробуйте повторить позднее.',
      );
    }

    res.send({ users });
  })
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(ERROR_CODE.Created).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError(
          'Переданы некорректные данные при создании пользователя.',
        );
      }

      if (err.name === 'MongoServerError') {
        customError = new DuplicateError('Пользователь с таким email уже зарегестрирован');
      }

      next(customError);
    });
};

export const updateProfileInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user as ObjectId;

  return User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user as ObjectId;

  return User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при обновлении аватара.');
      }

      if (customError.name === 'CastError') {
        customError = new NotFoundError('Пользователь с указанным _id не найден.');
      }

      next(customError);
    });
};
