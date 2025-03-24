import { Router } from 'express'
import { body } from 'express-validator'

import { validation } from 'src/middleware/validation.js'

import { ProjectController } from 'src/controllers/ProjectControler/index.js'


const projectRoutes = Router()

projectRoutes.post('/',
  body('projectName').notEmpty().withMessage('El nombre del proyecto es requerido').isString(),
  body('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
  validation,
  ProjectController.createProject
)
projectRoutes.get('/', ProjectController.getAllProjects)

export { projectRoutes }