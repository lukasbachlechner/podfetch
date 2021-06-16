import { Response } from 'express';

export default class ErrorResponse {
  constructor(res: Response, code: number, message: string) {
    res.status(code).send({ code, message });
  }
}
