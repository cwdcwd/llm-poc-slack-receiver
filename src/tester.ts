const express = require('express')
const app = express()
const port = process.env.PORT || 3000

import { Routes } from '@interfaces/routes.interface'
import { logger } from '@utils/logger'

app.get('/', (req, res) => {
  logger.info('Hello World!')
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`=================================`)
  logger.info(`======= ENV: ${process.env.NODE_ENV} =======`)
  logger.info(`🚀 App listening on the port ${port}`)
  console.log(`Example app listening on port ${port}`)
})
