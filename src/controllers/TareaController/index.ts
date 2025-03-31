import type { Request, Response } from 'express'

import { Tarea } from 'src/models/tarea/index.js'

export class TareaController {

  //POST /api/projects/:projectId/tareas
  static crateTarea = async (req: Request, res: Response) => {
    try {
      const tarea = new Tarea(req.body)
      if (req.project) {
        tarea.project = req.project.id
        req.project.tareas.push(tarea.id)
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
  static getOneTarea = async (req: Request, res: Response): Promise<void> => {
    try {
      const tarea = await Tarea.findById(req.params.tareaid)
      if (!tarea) {
        res.status(404).json({ message: 'Tarea not found' })
        return
      }
      if (tarea.project.toString() !== req.project.id) {
        res.status(403).json({ message: 'esta tarea no pertenece al proyecto' })
        return
      }
      res.status(200).json(tarea)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static putTarea = async (req: Request, res: Response): Promise<void> => {
    try {
      const {tareaid} = req.params
      const tarea = await Tarea.findByIdAndUpdate(tareaid, req.body)
      if (!tarea) {
        res.status(404).json({ message: 'Tarea not found' })
        return
      }
      if (tarea.project.toString() !== req.project.id) {
        res.status(403).json({ message: 'esta tarea no pertenece al proyecto' })
        return
      }
      res.status(200).json(tarea)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}