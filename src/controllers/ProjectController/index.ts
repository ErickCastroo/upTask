import { Router, type Request, type Response } from 'express'

import { Project } from 'src/models/project/index.js'

export class ProjectController {


  //POST 
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)
    //assign the user to the project
    project.manager = req.user._id
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
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user._id } },
          { team: { $in: req.user._id } }
        ]
      })
      res.status(200).send(projects)
    } catch (error) {
      console.log(error)
    }
  }

  //GET ONE
  static getOneProject = async (req: Request, res: Response) => {
    try {
      const projects = await Project.findById(req.params.id).populate('tareas')
      if (!projects) {
        const error = new Error('Proyecto no encontrado')
        res.status(404).send(error.message)
      }
      if (!projects?.manager || projects.manager.toString() !== req.user._id.toString() && !projects.team.includes(req.user._id)) {
        const error = new Error('Este Proyecto no te pertenece')
        res.status(404).send(error.message)
      }
      res.status(200).send(projects)
    } catch (error) {
      console.log(error)
    }
  }

  // PUT
  static putProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, { new: true })
      if (!project) {
        res.status(404).json({ message: 'Proyecto no encontrado' })
        return
      }

      if (!project?.manager || project.manager.toString() !== req.user._id.toString()) {
        const error = new Error('Este Proyecto no te pertenece')
        res.status(404).send(error.message)
      }

      res.status(200).json(project)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  //DELETE
  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id, req.body, { new: true })
      if (!project) {
        res.status(404).json({ message: 'Proyecto no encontrado' })
        return
      }
      if (!project?.manager || project.manager.toString() !== req.user._id.toString()) {
        const error = new Error('Este Proyecto no te pertenece')
        res.status(404).send(error.message)
      }
      await project.deleteOne()
      res.status(200).json({ message: 'Proyecto eliminado' })
    } catch (error) {
      console.log(error)
    }
  }
}