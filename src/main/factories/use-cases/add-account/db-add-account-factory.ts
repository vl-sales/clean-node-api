import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { type AddAccount } from '../../../../domain/useCases/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcryptAdapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const encrypter = new BcryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(encrypter, addAccountRepository, addAccountRepository)
}
