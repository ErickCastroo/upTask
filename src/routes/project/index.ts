import { Router } from 'express'
import { body, param } from 'express-validator'

import { validation } from 'src/middleware/validation.js'
import { validationProject } from 'src/middleware/project.js'

import { ProjectController } from 'src/controllers/ProjectController/index.js'
import { TareaController } from 'src/controllers/TareaController/index.js'

const projectRoutes = Router()

//POST /api/projects
projectRoutes.post('/',
  body('projectName').notEmpty().withMessage('El nombre del proyecto es requerido').isString(),
  body('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
  validation,
  ProjectController.createProject
)

//GET /api/projects
projectRoutes.get('/', ProjectController.getAllProjects)

//GET ONE /api/projects/:id
projectRoutes.get('/:id',
  param('id').notEmpty().isMongoId().withMessage('El id del proyecto no es valido'),
  validation,
  ProjectController.getOneProject
)

//PUT /api/projects/:id
projectRoutes.put('/:id',
  param('id').notEmpty().isMongoId().withMessage('El id del proyecto no es valido'),
  body('projectName').notEmpty().withMessage('El nombre del proyecto es requerido').isString(),
  body('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
  validation,
  ProjectController.putProject
)

//DELETE /api/projects/:id
projectRoutes.delete('/:id',
  param('id').notEmpty().isMongoId().withMessage('El id del proyecto no es valido'),
  validation, 
  ProjectController.deleteProject
)

projectRoutes.post('/:projectId/tareas',
  param('projectId').notEmpty().isMongoId().withMessage('El id del proyecto no es valido'),
  validationProject,
  TareaController.crateTarea
)

export { projectRoutes }