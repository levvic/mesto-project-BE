import ERROR_CODE from '../utils/constants';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.Forbidden;
  }
}

export default ForbiddenError;
