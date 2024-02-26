import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signUp/signup'
import { type Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()

  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()

  const signupController = new SignUpController(emailValidator, addAccount, makeSignupValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
