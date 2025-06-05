import { Request, Response } from 'express'

import { Email, PasswordMail } from 'src/emails/index.js'
import { HashPasword, cheackPassword } from 'src/utils/index.js'
import { generateToken } from 'src/utils/Token.js'
import { Token } from 'src/models/Token/index.js'
import { User } from 'src/models/auth/index.js'
import { JwtToken } from 'src/utils/jwt.js'

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { password } = req.body
      const user = new User(req.body)

      //prevent duplicate email
      const existingUser = await User.findOne({ email: user.email })
      if (existingUser) {
        return res.status(409).json({ message: 'El Email ya existe' })
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
        return res.status(401).json({ message: 'Token invalido' })
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
        const Itoken = new Token()
        Itoken.user = user.id
        Itoken.token = generateToken()
        await Itoken.save()
        //Email verification whit nodemailer
        Email.sendEmail({
          email: user.email,
          name: user.name,
          token: Itoken.token,
        })
        return res.status(401).json({ message: 'Usuario No confirmado verifique su correo' })
      }
      const ispasswordValid = await cheackPassword(password, user.password)

      if (!ispasswordValid) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' })
      }

      const Jwttoken = JwtToken({ id: user._id as import('mongoose').Types.ObjectId })

      console.log('Jwttoken', Jwttoken)
      res.status(200).json({
        message: 'Login successful',
        token: Jwttoken,
      })
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }

  static NewToken = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const emailExist = await User.findOne({ email })
      if (!emailExist) {
        return res.status(409).json({ message: 'el ususario no esta registrado' })
      }
      if (emailExist.confirmed) {
        return res.status(403).json({ message: 'el ususario ya esta confirmado' })
      }

      const Itoken = new Token()
      Itoken.user = emailExist.id
      Itoken.token = generateToken()
      await Itoken.save()

      //Email verification whit nodemailer
      Email.sendEmail({
        email: emailExist.email,
        name: emailExist.name,
        token: Itoken.token,
      })

      await Promise.allSettled([emailExist.save(), Itoken.save()])

      res.status(201).json({ message: 'Se envio un nuevo token', })
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  }

  static passwordF = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const emailExist = await User.findOne({ email })
      if (!emailExist) {
        return res.status(409).json({ message: 'el ususario no esta registrado' })
      }

      const Itoken = new Token()
      Itoken.user = emailExist.id
      Itoken.token = generateToken()
      await Itoken.save()

      //Email verification whit nodemailer
      PasswordMail.passwordRecoveryEmail({
        email: emailExist.email,
        name: emailExist.name,
        token: Itoken.token,
      })

      res.status(201).json({ message: 'Revisa tu mail', })
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al enviar el correo solicite asistencia' })
    }
  }

  static getUser = async (req: Request, res: Response) => {
    res.json(req.user)
  }
}