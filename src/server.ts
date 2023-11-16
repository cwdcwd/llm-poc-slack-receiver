import { App } from '@/app'
// import { SlackRoute } from '@/routes/slacks.route'
import { HealthRoute } from './routes/health.route'
import { logger } from '@utils/logger'

logger.info('starting up...')
// ValidateEnv()

const app = new App([new HealthRoute()])

app.listen()
logger.info('started')
