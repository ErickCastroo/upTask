import { Request, Response } from 'express'

import { User } from 'src/models/auth/index.js'
import { HashPasword } from 'src/utils/index.js'

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { password } = req.body
      const user = new User(req.body)

      //prevent duplicate email
      const existingUser = await User.findOne({ email: user.email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      // Hash the password before saving
      user.password = await HashPasword(password)
      await user.save()
      res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }
}