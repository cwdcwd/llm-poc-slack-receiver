export const CREDENTIALS = process.env.CREDENTIALS === 'true'
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, SLACK_SIGNING_SECRET } = process.env
export const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env
export const { PINECONE_API_KEY, PINECONE_INDEX, PINECONE_ENV } = process.env
