export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswers[]
  date: Date
}

export interface SurveyAnswers {
  image?: string
  answer: string
}
