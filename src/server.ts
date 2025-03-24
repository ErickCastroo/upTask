import express from 'express'
import dotenv from 'dotenv'

import { router } from './router/index.js'

import { conectarDB } from 'src/config/db.js'


dotenv.config()
conectarDB()

const app = express()
app.use(express.json())
app.use('/api', router)

export default app