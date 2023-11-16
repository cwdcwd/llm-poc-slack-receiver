import { App } from '@/app'
import { SlackRoute } from './routes/slacks.route'
import { logger } from '@utils/logger'

logger.info('starting up...')
// ValidateEnv()

const app = new App([new SlackRoute()])

app.listen()
logger.info('started')
