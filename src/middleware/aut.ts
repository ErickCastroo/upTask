import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
import { config } from "dotenv"
import { User } from "src/models/auth/index.js"

config()

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const token = bearerToken.split(' ')[1]

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      res.status(500).json({ message: 'JWT secret not configured' })
      return
    }

    const decoded = Jwt.verify(token, jwtSecret as string)

    const user = await User.findById((decoded as { id: string }).id ).select('_id name email')
    if (user) {
      req.user = user 
    }
    else {
      res.status(401).json({ message: 'User not found' })
      return
    }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
