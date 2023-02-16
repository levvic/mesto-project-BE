import ERROR_CODE from '../utils/constants';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.NotFound;
  }
}

export default NotFoundError;
