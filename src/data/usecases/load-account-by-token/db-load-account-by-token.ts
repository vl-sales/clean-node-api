import { type LoadAccountByToken } from '../../../domain/useCases/load-account-by-token'
import { type Decrypter } from '../../protocols/criptography/decrypter'
import { type AccountModel } from '../authentication/db-authentication-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
