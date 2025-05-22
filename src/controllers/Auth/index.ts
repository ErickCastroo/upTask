import { Request, Response } from 'express'

import { User } from 'src/models/auth/index.js'
import { Token } from 'src/models/Token/index.js'
import { HashPasword } from 'src/utils/index.js'
import { generateToken } from 'src/utils/Token.js'

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { password } = req.body
      const user = new User(req.body)

      //prevent duplicate email
      const existingUser = await User.findOne({ email: user.email })
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' })
      }

      const Itoken = new Token()
      Itoken.token = generateToken()
      Itoken.user = user._id as import('mongoose').Types.ObjectId

      // Hash the password before saving
      user.password = await HashPasword(password)

      await Promise.allSettled([user.save(), Itoken.save()])

      res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }
}