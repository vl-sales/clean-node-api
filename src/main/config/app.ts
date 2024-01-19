import express from 'express'
import setupMiddleware from './middlewares'

const app = express()
export default app
setupMiddleware(app)
