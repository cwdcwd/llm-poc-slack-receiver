import { Router } from 'express'
import { SlackController } from '@/controllers/slacks.controller'
import { CreateSlackDto, UpdateSlackDto } from '@/dtos/slacks.dto'
import { Routes } from '@interfaces/routes.interface'
import { ValidationMiddleware } from '@middlewares/validation.middleware'

export class SlackRoute implements Routes {
  public path = '/slacks'
  public router = Router()
  public slack = new SlackController()

  constructor() {
    console.log('SlackRoute constructor')
    this.initializeRoutes()
  }

  private initializeRoutes() {
    console.log('SlackRoute initializeRoutes')
    this.router.use(this.slack.validateOrigin)
    this.router.get(`${this.path}`, this.slack.getSlacks)
    this.router.get(`${this.path}/:id`, this.slack.getSlackById)
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSlackDto, true), this.slack.createSlack)
    // this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateSlackDto, true), this.slack.updateSlack)
    // this.router.delete(`${this.path}/:id`, this.slack.deleteSlack)
  }
}
