import type { Request, Response } from 'express'

import { Tarea } from 'src/models/tarea/index.js'

export class TareaController {

  //POST /api/projects/:projectId/tareas
  static crateTarea = async (req: Request, res: Response) => {
    try {
      const tarea = new Tarea(req.body)
      if (req.project) {
        tarea.project = req.project.id
        req.project.tareas.push(tarea .id)
        await req.project.save()
      } else {
        throw new Error('Project is null')
      }
      await tarea.save()
      res.status(201).send(tarea)
      console.log('Tarea creada con éxito')
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  //GET /api/projects/:projectId/tareas
  static getAllTareas = async (req: Request, res: Response) => {
    try {
      const tareas = await Tarea.find({ project: req.project.id }).populate('project')
      res.status(200).send(tareas)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  //GET /api/projects/:projectId/tareas/:tareaId
  static getOneTarea = async (req: Request, res: Response) => {
    try {
      
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}