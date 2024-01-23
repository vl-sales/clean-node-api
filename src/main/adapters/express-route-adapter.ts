import { type Request, type Response } from 'express'
import { type HttpRequest, type Controller } from '../../presentation/protocols'
import { type RouteReturn } from './types/adaptRouteReturn'

export const adaptRoute = (controller: Controller): RouteReturn => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode)
    res.json(httpResponse.body)
  }
}
