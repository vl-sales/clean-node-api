import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { type Authentication } from '../../../../domain/useCases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcryptAdapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasher = new BcryptAdapter(12)
  const encrypter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, hasher, encrypter, accountMongoRepository)
}
