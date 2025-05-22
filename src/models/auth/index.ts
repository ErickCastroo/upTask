import mongoose, { Schema, Document } from 'mongoose'

export interface Iauth extends Document {
  email: string
  password: string
  name: string
  confirmed: boolean
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  }
})
const User = mongoose.model<Iauth>('User', userSchema)

export { User }