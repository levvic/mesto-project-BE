import express, { json } from 'express';
import mongoose from 'mongoose';
import { signInValidator, signUpValidator } from './utils/validator';
import auth from './middleware/auth';
import { createUser, login } from './controllers/user';
import errorHandler from './middleware/errorHandler';
import router from './routes';
import { NotFoundError } from './errors';
import { DB_URL, MODE, SERVER_PORT } from './utils/config';

const app = express();
mongoose.connect(DB_URL);

app.use(json());

app.post('/signin', signInValidator, login);
app.post('/signup', signUpValidator, createUser);

app.use(auth);
app.use(router);

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${SERVER_PORT}
  App is running in ${MODE} mode`);
});
