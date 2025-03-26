import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose'

import { TareaType } from 'src/models/tarea/index.js'

export interface ProjectType extends Document {
  projectName: string,
  clientName: string,
  description: string,
  tareas: PopulatedDoc<TareaType & Document>[]
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
  ]

}, {timestamps: true})



const Project = mongoose.model<ProjectType>('Project', projectSchema)

export { Project }