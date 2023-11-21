import { logger } from '@/utils/logger'
import { connect, set } from 'mongoose'
import { Pinecone } from '@pinecone-database/pinecone'
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '@config'
import { PINECONE_ENV, PINECONE_INDEX } from '@config'

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      ssl: false,
      authSource: 'admin',
      // auth: {
      //   username: DB_USER,
      //   password: DB_PASSWORD,
      // },
    },
  }

  if (NODE_ENV !== 'production') {
    set('debug', true)
  }

  logger.info('Connecting to database...')
  logger.info(dbConfig)
  try {
    await connect(dbConfig.url, dbConfig.options)
  } catch (error) {
    logger.error('Error connecting to database: ', error)
    process.exit(1)
  }
}

export const pineconeConnection = async (indexName?: string) => {
  let index = null
  logger.info('Connecting to pinecone...')
  logger.info(PINECONE_INDEX)
  logger.info(PINECONE_ENV)
  try {
    const pinecone = new Pinecone()
    index = pinecone.Index(indexName || PINECONE_INDEX)
  } catch (error) {
    logger.error('Error connecting to pinecone: ', error)
    process.exit(1)
  }

  return index
}
