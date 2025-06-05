import { Router } from 'express'
import { body, param } from 'express-validator'

import { validation } from 'src/middleware/validation.js'
import { validationProject } from 'src/middleware/project.js'

import { ProjectController } from 'src/controllers/ProjectController/index.js'
import { TareaController } from 'src/controllers/TareaController/index.js'
import { TeamController } from 'src/controllers/TeamController/index.js'

import { AuthMiddleware } from 'src/middleware/aut.js'

const projectRoutes = Router()

projectRoutes.use(AuthMiddleware)

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



//TAREAS
//Post /api/projects/:projectId/tareas
projectRoutes.post('/:projectId/tareas',
  body('name').notEmpty().withMessage('El nombre del la tareas es requerido').isString(),
  validation,
  validationProject,
  TareaController.crateTarea
)
//Get /api/projects/:projectId/tareas
projectRoutes.get('/:projectId/tareas',
  validationProject,
  TareaController.getAllTareas
)
//Get /api/projects/:projectId/tareas
projectRoutes.get('/:projectId/tareas/:tareaid',
  param('tareaid').notEmpty().isMongoId().withMessage('El id de la tarea no es valido'),
  validation,
  validationProject,
  TareaController.getOneTarea
)
//PUT /api/projects/:projectId/tareas/:tareaid
projectRoutes.put('/:projectId/tareas/:tareaid',
  param('tareaid').notEmpty().isMongoId().withMessage('El id de la tarea no es valido'),
  body('name').notEmpty().withMessage('El nombre del la tareas es requerido').isString(),
  body('description').notEmpty().withMessage('La descripcion de la tarea es requerido').isString(),
  body('status').notEmpty().withMessage('El status de la tarea es requerido').isString(),
  validation,
  validationProject,
  TareaController.putTarea
)
projectRoutes.put('/:projectId/tareas/:tareaid/status',
  param('tareaid').notEmpty().isMongoId().withMessage('El id de la tarea no es valido'),
  body('status').notEmpty().withMessage('El status de la tarea es requerido').isString(),
  validation,
  validationProject,
  TareaController.updateTareaStatus
)
//DELETE /api/projects/:projectId/tareas/:tareaid
projectRoutes.delete('/:projectId/tareas/:tareaid',
  param('tareaid').notEmpty().isMongoId().withMessage('El id de la tarea no es valido'),
  validation,
  validationProject,
  TareaController.deleteTarea
)

//Teams
projectRoutes.post('/:projectId/team/find',
  body('email').notEmpty().withMessage('El email del usuario es requerido').isEmail(),
  validation,
  (req, res, next) => {
    Promise.resolve(TeamController.findUserByEmail(req, res))
      .then(() => undefined)
      .catch(next);
  }
)

projectRoutes.post('/:projectId/team',
  body('id').isMongoId().withMessage('El id del usuario es requerido y debe ser un id valido'),
  validation,
  validationProject,
  (req, res, next) => {
    Promise.resolve(TeamController.addUserById(req, res))
      .then(() => undefined)
      .catch(next);
  }
)


projectRoutes.delete('/:projectId/team',
  body('id').isMongoId().withMessage('El id del usuario es requerido y debe ser un id valido'),
  validation,
  validationProject,
  (req, res, next) => {
    Promise.resolve(TeamController.deleteUserById(req, res))
      .then(() => undefined)
      .catch(next);
  }
)

export { projectRoutes }