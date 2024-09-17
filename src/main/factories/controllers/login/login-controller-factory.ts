import { type Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/authentication/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../use-cases/account/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
