import jwt from 'jsonwebtoken'
import { type Encrypter } from '../../../data/protocols/criptography/encrypter'
import { type Decrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
