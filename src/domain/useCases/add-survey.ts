import { type SurveyAnswers } from '../models/survey'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswers[]
  date: Date
}

export interface AddSurvey {
  add: (account: AddSurveyModel) => Promise<void>
}
