import { env } from 'node:process'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const config = () => {
  return {
    host: String(env.SMTP_HOST),
    port: Number(env.SMTP_PORT),
    auth: {
      user: String(env.SMTP_USER),
      pass: String(env.SMTP_PASS),
    }
  }
}

export const transporter = nodemailer.createTransport(config())