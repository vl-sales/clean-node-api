import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'

const app = express()
export default app
setupMiddleware(app)
setupRoutes(app)
