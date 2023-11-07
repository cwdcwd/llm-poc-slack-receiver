import { connect, set } from 'mongoose'
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '@config'

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      // auth: {
      //   username: DB_USER,
      //   password: DB_PASSWORD,
      // },
    },
  }

  if (NODE_ENV !== 'production') {
    set('debug', true)
  }

  console.log('Connecting to database...')
  console.log(dbConfig)
  await connect(dbConfig.url, dbConfig.options)
}
