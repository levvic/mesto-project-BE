import ERROR_CODE from '../utils/constants';

class ServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.InternalServerError;
  }
}

export default ServerError;
