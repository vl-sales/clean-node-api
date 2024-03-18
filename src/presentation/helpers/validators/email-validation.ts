import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/emailValidator'
import { type Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const emailIsValid = this.emailValidator.isValid(input[this.fieldName])
    if (!emailIsValid) {
      return new InvalidParamError('email')
    }
  }
}
