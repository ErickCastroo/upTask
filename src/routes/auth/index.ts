import { Router } from 'express'
import { body } from 'express-validator'

import { validation } from 'src/middleware/validation.js'

import { AuthController } from 'src/controllers/Auth/index.js'
import { AuthMiddleware } from 'src/middleware/aut.js'

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
  (req, res, next) => {
    Promise.resolve(AuthController.createUser(req, res))
      .catch(next)
  }
)

router.post('/confirmUser',
  body('token').notEmpty().withMessage('el token es obligatorio'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.UserToken(req, res))
      .catch(next)
  }
)

router.post('/newToken',
  body('email').notEmpty().isEmail().withMessage('el email es obligatorio'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.NewToken(req, res))
      .catch(next)
  }
)

router.post('/passwordRecovery',
  body('email').notEmpty().isEmail().withMessage('el email es obligatorio'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.passwordF(req, res))
      .catch(next)
  }
)

router.post('/login',
  body('email').notEmpty().isEmail().withMessage('el email es obligatorio'),
  body('password').isLength({ min: 8 }).notEmpty().withMessage('La contraseña es incorrecta'),
  validation,
  (req, res, next) => {
    Promise.resolve(AuthController.Login(req, res))
      .catch(next)
  }
)

router.get ( '/user',
  AuthMiddleware,
  (req, res, next) => {
    Promise.resolve(AuthController.getUser(req, res))
      .catch(next)
  }
)

export { router as authRoutes }