import ERROR_CODE from '../utils/constants';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.Unauthorized;
  }
}

export default UnauthorizedError;
