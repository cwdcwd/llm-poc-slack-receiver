import { App } from '@/app'
import { AuthRoute } from '@routes/auth.route'
import { UserRoute } from '@routes/users.route'
import { SlackRoute } from './routes/slacks.route'
import { ValidateEnv } from '@utils/validateEnv'

ValidateEnv()

const app = new App([new SlackRoute(), new UserRoute(), new AuthRoute()])

app.listen()
