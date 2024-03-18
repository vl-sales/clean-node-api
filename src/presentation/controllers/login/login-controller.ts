import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/https-helper'
import { type Controller, type HttpRequest, type HttpResponse, type Authentication, type Validation } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth(httpRequest.body)
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
