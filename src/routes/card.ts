import { Router } from 'express';
import { cardIdValidator, createCardValidator } from '../utils/validator';
import {
  createCard,
  deleteCard,
  getCards,
  putLike,
  removeLike,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', cardIdValidator, deleteCard);
cardRouter.post('/cards', createCardValidator, createCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidator, putLike);
cardRouter.delete('/cards/:cardId/likes', cardIdValidator, removeLike);

export default cardRouter;
