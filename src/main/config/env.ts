export default {
  mongoUrl: process.env.DATABASE_URL || 'mongodb://mongo:27017/clean-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'TiJ-%03t673q4'
}
