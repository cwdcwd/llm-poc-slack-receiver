const express = require('express')
const app = express()
const port = process.env.PORT || 3000

import { Routes } from '@interfaces/routes.interface'
import { logger } from '@utils/logger'
import { AuthRoute } from '@routes/auth.route'
import { UserRoute } from '@routes/users.route'
import { SlackRoute } from './routes/slacks.route'

app.get('/', (req, res) => {
  logger.info('Hello World!')
  res.send('Hello World!')
})

const routes: Routes[] = [
  // new SlackRoute(),
  // new UserRoute(),
  new AuthRoute(),
]

routes.forEach(route => {
  logger.info(`Setting up route for: ${route}`)
  app.use('/', route.router)
})

app.listen(port, () => {
  logger.info(`=================================`)
  logger.info(`======= ENV: ${process.env.NODE_ENV} =======`)
  logger.info(`🚀 App listening on the port ${port}`)
  console.log(`Example app listening on port ${port}`)
})
