import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { BadRequestError, NotFoundError, ServerError } from '../errors';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => {
    if (!cards) {
      throw new ServerError('Произошла ошибка при получении списка карточек.');
    }

    res.send({ cards });
  })
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user._id;

  return Card.create({ name, link, owner: id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные при создании карточки.');
      }

      res.send({ card });
    })
    .catch(next);
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user._id;

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
    .catch(next);
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user._id as ObjectId;

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
    .catch(next);
};
