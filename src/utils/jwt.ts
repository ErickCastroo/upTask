import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { Types } from 'mongoose';

config();


type userPayload = {
  id: Types.ObjectId
}

export const JwtToken = (payload: userPayload): string => {

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn:'180d'
    });
  return token
};