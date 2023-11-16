import { Router } from 'express'

import { Routes } from '@/interfaces/routes.interface'
import { HealthController } from '@/controllers/health.controller'

export class HealthRoute implements Routes {
  public path = '/health'
  public router = Router()
  public health = new HealthController()

  constructor() {
    console.log('HealthRoute constructor')
    this.initializeRoutes()
  }

  private initializeRoutes() {
    console.log('HealthRoute initializeRoutes')
    console.log('HealthRoute initializeRoutes check')
    this.router.get(`${this.path}`, this.health.check)
  }
}
