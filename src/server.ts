import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { projectRoutes } from 'src/routes/project/index.js'
import { authRoutes } from 'src/routes/auth/index.js'

import { conectarDB } from 'src/config/db.js'

dotenv.config()
conectarDB()

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173'
}))

//Rutas
app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)

export default app