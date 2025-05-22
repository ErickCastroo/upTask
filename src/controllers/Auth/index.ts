import { Request, Response } from 'express'
import { User } from 'src/models/auth/index.js'

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body)
      await user.save();

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }
}