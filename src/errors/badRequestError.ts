import ERROR_CODE from '../utils/constants';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.BadRequest;
  }
}

export default BadRequestError;
