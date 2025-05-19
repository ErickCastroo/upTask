import { exit } from 'node:process'
import mongoose from 'mongoose'

const conectarDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('Database URL is not defined in environment variables')
    }
    const conectar = await mongoose.connect(process.env.DB_URL)
    const url=`${conectar.connection.host}/${conectar.connection.name}`
    console.log(`MongoDB connected: ${url}`.magenta.underline.bold)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`.red.underline.bold)
    } else {
      console.log('An unknown error occurred'.red.underline.bold)
    }
    exit(1)
  }
}

export { conectarDB }