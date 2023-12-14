import { MissingPramError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/https-helper'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingPramError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingPramError('email'))
    }
  }
}
