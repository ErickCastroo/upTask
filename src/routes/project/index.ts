import { Router } from 'express'

import { ProjectController } from 'src/controllers/ProjectControler/index.js'

const projectRoutes = Router()

projectRoutes.post('/', ProjectController.createProject)
projectRoutes.get('/', ProjectController.getAllProjects)

export { projectRoutes }