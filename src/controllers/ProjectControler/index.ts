import type { Request, Response } from 'express'

import { Project } from 'src/models/project/index.js'

export class ProjectController {

  //POST 
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

  //GET
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.status(200).send(projects)
    } catch (error) {
      console.log(error)
    }
  }

  //GET ONE
  static getOneProject = async (req: Request, res: Response) => {
    try {
      const projects = await Project.findById(req.params.id)
      if (!projects) {
        const error = new Error('Proyecto no encontrado')
        res
          .status(404)
          .
          send(error)
      }
      res.status(200).send(projects)
    } catch (error) {
      console.log(error)
    }
  }

  //PUT


  //DELETE
}