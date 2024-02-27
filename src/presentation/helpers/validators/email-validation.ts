import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/emailValidator'
import { type Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly emailValidator: EmailValidator
  private readonly fieldName: string
  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const emailIsValid = this.emailValidator.isValid(input[this.fieldName])
    if (!emailIsValid) {
      return new InvalidParamError('email')
    }
  }
}
