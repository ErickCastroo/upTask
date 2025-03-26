import type { Request, Response } from 'express'

import { Tarea } from 'src/models/tarea/index.js'


export class TareaController {
  static crateTarea = async (req: Request, res: Response) => {
    try {
      const tarea = new Tarea(req.body)
      if (req.project) {
        tarea.project = req.project.id
        req.project.tareas.push(tarea .id)
        await req.project.save()
      } else {
        throw new Error('Project is null');
      }
      await tarea.save()
      res.status(201).send(tarea)
      console.log('Tarea creada con éxito')
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}