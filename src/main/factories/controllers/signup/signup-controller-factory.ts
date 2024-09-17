import { SignUpController } from '../../../../presentation/controllers/login/signUp/signup'
import { type Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../use-cases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../use-cases/account/authentication/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const signupController = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
}
