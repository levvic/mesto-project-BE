import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import { BadRequestError } from '../errors';

const emailValidator = (email: string) => {
  if (!validator.isEmail(email)) {
    throw new BadRequestError('Передан невалидный email');
  }
  return email;
};

const urlValidator = (link: string) => {
  if (!validator.isURL(link, { require_protocol: true })) {
    throw new BadRequestError('Передана невалидная ссылка');
  }
  return link;
};

export const signUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().custom(emailValidator),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((link) => {
      if (validator.isURL(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequestError('Передана невалидная ссылка');
    }),
  }),
});

export const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(urlValidator),
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator),
  }),
});

export const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
