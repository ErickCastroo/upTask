import { Request, Response } from 'express';

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    res.status(200).json({
      msg: 'createUser'
    })
  }
}