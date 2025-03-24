import type { Request, Response } from 'express'

import { Project } from 'src/models/project/index.js'

export class ProjectController {

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)
    try {
      await project.save()
      res.status(201).send(project)
      console.log('Proyecto creado con éxito')
    } catch (error) {
      res.status
    }
  }
  static getAllProjects = async (req: Request, res: Response) => {
    res.send('Get all projects')
  }
}