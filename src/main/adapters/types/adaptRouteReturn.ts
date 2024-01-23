import { type Request, type Response } from 'express'

export type RouteReturn = (req: Request, res: Response) => Promise<void>
