import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IToken extends Document {
  token: string
  user: Types.ObjectId
  createdAt: Date
}

const TokenSchema: Schema = new Schema({

  token: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1m',
  },
})

const Token = mongoose.model<IToken>('Token', TokenSchema)

export { Token }