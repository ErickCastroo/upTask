import mongoose, { Schema, Document } from 'mongoose'


export type ProjectType = Document &{
  projectName: string,
  clientName: string,
  description: string,
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
  }
})

const Project = mongoose.model<ProjectType>('Project', projectSchema)

export { Project }