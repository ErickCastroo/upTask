import { Request, Response } from 'express'

import { Email } from 'src/emails/index.js'
import { HashPasword } from 'src/utils/index.js'
import { generateToken } from 'src/utils/Token.js'
import { Token } from 'src/models/Token/index.js'
import { User } from 'src/models/auth/index.js'

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

      //Email verification whit nodemailer
      Email.sendEmail({
        email: user.email,
        name: user.name,
        token: Itoken.token,
      })

      await Promise.allSettled([user.save(), Itoken.save()])

      res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }

  static UserToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      const user = await User.findById(tokenExists.user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      user.confirmed = true
      await user.save()
      await Token.deleteOne()
      res.status(200).json({ message: 'User confirmed successfully' })
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }

  static Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }
      if (!user.confirmed) {
        return res.status(401).json({ message: 'User not confirmed' })
      }
      console.log(user)
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }
}