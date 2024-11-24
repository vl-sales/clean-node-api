import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { type Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from '../use-cases/load-account-by-token/db-add-account-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadAccountByToken, role)
}
