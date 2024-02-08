import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/https-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
