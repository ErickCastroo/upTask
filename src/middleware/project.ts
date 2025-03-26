import { Request, Response, NextFunction } from 'express'

import { Project, ProjectType } from "src/models/project/index.js"

declare global {
  namespace Express {
    interface Request {
      project: ProjectType
    }
  }

}

export async function validationProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
      const error = new Error('Proyecto no encontrado')
      res.status(404).send(error.message)
    }
    if (project) {
      req.project = project
    } else {
      throw new Error('Proyecto no encontrado')
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
    
  }
}