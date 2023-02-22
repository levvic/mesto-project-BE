import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import {
  BadRequestError, NotFoundError, ForbiddenError,
} from '../errors';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => {
    res.send({ cards });
  })
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user as JwtPayload;

  return Card.findOne({ _id: cardId })
    .then((card) => {
      const ownerId = String(card?.owner);

      if (userId?._id !== ownerId) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }

      return Card.deleteOne({ _id: card?._id });
    })
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user as ObjectId;

  return Card.create({ name, link, owner: id })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      let customError = err;

      if (err.name === 'ValidationError') {
        customError = new BadRequestError('Переданы некорректные данные при создании карточки.');
      }
      next(customError);
    });
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user as ObjectId;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }

      res.send(card);
    })
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user as ObjectId;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }

      res.send(card);
    })
    .catch((err) => {
      let customError = err;

      if (customError.name === 'CastError') {
        customError = new BadRequestError('Переданы некорректные данные.');
      }

      next(customError);
    });
};
