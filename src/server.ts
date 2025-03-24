import express from 'express'
import dotenv from 'dotenv'

import { projectRoutes } from 'src/routes/project/index.js'

import { conectarDB } from 'src/config/db.js'


dotenv.config()
conectarDB()

const app = express()
app.use(express.json())


//Rutas
app.use('/api/projects', projectRoutes)

export default app