import { type AccountModel } from '../../domain/models/account'
import { type LoadAccountByToken } from '../../domain/useCases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/https-helper'
import { AuthMiddleware } from './auth-middleware'

const makeFakeAccount = (): AccountModel => (
  {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
  }
)

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }

  return new LoadAccountByTokenStub()
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware(makeLoadAccountByTokenStub())
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountByTokenStub = makeLoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
