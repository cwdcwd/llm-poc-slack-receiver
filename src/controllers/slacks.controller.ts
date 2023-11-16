import { NextFunction, Request, Response } from 'express'
// import rawBody from 'raw-body'
// import { Container } from 'typedi'
// import { Slack } from '@interfaces/slacks.interface'
import { SlackService } from '@/services/slacks.service'
import { createHmac } from 'crypto'
import { SLACK_SIGNING_SECRET } from '@config'
// import KSUID from 'ksuid'

export class SlackController {
  // public slack = Container.get(SlackService)
  public slack = new SlackService()

  public validateOrigin = (req: Request, res: Response, next: NextFunction) => {
    // const origin = req.headers.origin
    // if (origin === 'https://slack.com') {
    //   next()
    // } else {
    //   res.status(403).send('Forbidden')
    // }
    // console.log(req.headers)
    if (req.method === 'GET') {
      next()
      return
    }

    const signature = req.headers['x-slack-signature']
    const version = 'v0'
    const timestamp = req.headers['x-slack-request-timestamp']
    const body = req.rawBody //(await rawBody(req)).toString()

    // console.log(`body: ${body}`)
    const hmac = createHmac('sha256', SLACK_SIGNING_SECRET)
    hmac.update(`${version}:${timestamp}:${body}`)
    const computedSignature = `${version}=${hmac.digest('hex')}`
    console.log(`computedSignature: ${computedSignature}`)
    console.log(`signature: ${signature}`)

    if (computedSignature !== signature) {
      res.status(403).send('Forbidden')
      return
    }

    next()
  }

  // public getSlacks = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllSlacksData: Slack[] = await this.slack.findAllSlacks()

  //     res.status(200).json({ data: findAllSlacksData, message: 'findAll' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // public getSlackById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const slackId: string = req.params.id
  //     const findOneSlackData: Slack = await this.slack.findSlackById(slackId)

  //     res.status(200).json({ data: findOneSlackData, message: 'findOne' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // public createSlack = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // const id = await KSUID.random()
  //     const bodyData: Slack = req.body
  //     console.log(bodyData)

  //     if (bodyData.type === 'url_verification') {
  //       res.status(200).json({ challenge: bodyData.challenge })
  //     } else {
  //       const slackData: Slack = {
  //         // _id: id.string,
  //         type: bodyData.type,
  //         challenge: bodyData.challenge,
  //         token: bodyData.token,
  //         team_id: bodyData.team_id,
  //         api_app_id: bodyData.api_app_id,
  //         event: bodyData.event,
  //         event_id: bodyData.event_id,
  //         event_time: bodyData.event_time,
  //         authed_users: bodyData.authed_users,
  //       }
  //       const createSlackData: Slack = await this.slack.createSlack(slackData)
  //       res.status(201).json({ data: createSlackData, message: 'created' })
  //     }
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // public updateSlack = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const slackId: string = req.params.id
  //     const slackData: Slack = req.body
  //     const updateSlackData: Slack = await this.slack.updateSlack(slackId, slackData)

  //     res.status(200).json({ data: updateSlackData, message: 'updated' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // public deleteSlack = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id
  //     const deleteSlackData: Slack = await this.slack.deleteSlack(userId)

  //     res.status(200).json({ data: deleteSlackData, message: 'deleted' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
