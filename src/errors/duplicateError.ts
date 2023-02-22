import ERROR_CODE from '../utils/constants';

class DuplicateError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE.Conflict;
  }
}

export default DuplicateError;
