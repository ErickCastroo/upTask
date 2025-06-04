import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose'

import { TareaType } from 'src/models/tarea/index.js'
import { Iauth } from 'src/models/auth/index.js'

export interface ProjectType extends Document {
  projectName: string,
  clientName: string,
  description: string,
  tareas: PopulatedDoc<TareaType & Document>[]
  manager: PopulatedDoc<Iauth & Document>
}

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  tareas: [
    {
      type: Types.ObjectId,
      ref: 'Tarea',
    }
  ],
  manager: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ]



}, { timestamps: true })



const Project = mongoose.model<ProjectType>('Project', projectSchema)

export { Project }