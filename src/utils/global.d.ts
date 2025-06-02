import { Iauth } from "src/models/auth"

declare global {
  namespace Express {
    interface Request {
      user?: Iauth
    }
  }
}