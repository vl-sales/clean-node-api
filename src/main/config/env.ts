export default {
  mongoUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/clean-api',
  port: process.env.PORT || 5050
}
