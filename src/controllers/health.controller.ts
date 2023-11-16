import { Request, Response } from 'express'

export class HealthController {
  // public health = Container.get(HealthService)
  public health = {}

  public check = async (req: Request, res: Response) => {
    res.json({ status: 'OK' })
  }
}
