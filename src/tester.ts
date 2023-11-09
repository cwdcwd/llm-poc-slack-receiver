import { App } from '@/app'
import { AuthRoute } from '@routes/auth.route'
import { UserRoute } from '@routes/users.route'
import { SlackRoute } from './routes/slacks.route'
import { logger } from '@utils/logger'

logger.info('starting up...')
// ValidateEnv()

const app = new App([new SlackRoute()])

app.listen()
logger.info('started')
