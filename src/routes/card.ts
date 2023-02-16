import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  putLike,
  removeLike,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.post('/cards', createCard);
cardRouter.put('/cards/:cardId/likes', putLike);
cardRouter.delete('/cards/:cardId/likes', removeLike);

export default cardRouter;
