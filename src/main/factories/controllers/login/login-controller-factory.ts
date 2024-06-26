import { type Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
