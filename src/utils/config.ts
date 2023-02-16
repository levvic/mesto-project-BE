const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  NODE_ENV = 'development',
  JWT_SECRET = 'dev-super-secret',
} = process.env;

const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/mestodb`;
const MODE = NODE_ENV;

export {
  SERVER_HOST,
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  JWT_SECRET,
  SERVER_URL,
  DB_URL,
  MODE,
};
