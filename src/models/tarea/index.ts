import mongoose, { Schema, Document, Types } from 'mongoose'


const tareaStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed',
} as const

export type TareaStatus = typeof tareaStatus[keyof typeof tareaStatus]

export interface TareaType extends Document {
  name: string,
  description: string,
  project: Types.ObjectId,
  status: TareaStatus
}

const TareaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
  },
  status: {
    type: String,
    enum: Object.values(tareaStatus),
    default: tareaStatus.PENDING
  }

}, { timestamps: true })

const Tarea = mongoose.model<TareaType>('Tarea', TareaSchema)

export { Tarea }