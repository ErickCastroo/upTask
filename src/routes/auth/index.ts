import { Router } from 'express'
import { body } from 'express-validator'

import { validation } from 'src/middleware/validation.js'

import { AuthController } from 'src/controllers/Auth/index.js'

const router = Router()

router.post('/',
  body('name').notEmpty().withMessage('el nombre es obligatorio'),
  body('email').notEmpty().isEmail().withMessage('el email es obligatorio'),
  body('password').isLength({ min: 8 }).notEmpty().withMessage('la contraseña es obligatoria'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('las contraseñas no son iguales')
    }
    return true
  }
  ),
  validation,
  AuthController.createUser
)

export { router as authRoutes }
