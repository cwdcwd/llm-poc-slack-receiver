// import { Service } from 'typedi'
import { HttpException } from '@exceptions/httpException'
import { Slack } from '@/interfaces/slacks.interface'
import { SlackModel } from '@/models/slacks.model'

// @Service()
export class SlackService {
  constructor() {
    console.log('SlackService constructor')
  }

  public async findAllSlacks(): Promise<Slack[]> {
    const Slacks: Slack[] = await SlackModel.find()
    return Slacks
  }

  public async findSlackById(SlackId: string): Promise<Slack> {
    // const findSlack: Slack = await SlackModel.findOne({ _id: SlackId })
    // if (!findSlack) throw new HttpException(409, "Slack doesn't exist")
    // return findSlack
    return null
  }

  // public async createSlack(SlackData: Slack): Promise<Slack> {
  //   const findSlack: Slack = await SlackModel.findOne({ _id: SlackData._id })
  //   if (findSlack) throw new HttpException(409, `This id ${SlackData._id} already exists`)

  //   const createSlackData: Slack = await SlackModel.create({ ...SlackData })

  //   return createSlackData
  // }

  // public async updateSlack(SlackId: string, SlackData: Slack): Promise<Slack> {
  //   if (SlackData._id) {
  //     const findSlack: Slack = await SlackModel.findOne({ _id: SlackData._id })
  //     if (findSlack && findSlack._id != SlackId) throw new HttpException(409, `This id ${SlackData._id} already exists`)
  //   }

  //   const updateSlackById: Slack = await SlackModel.findByIdAndUpdate(SlackId, { SlackData })
  //   if (!updateSlackById) throw new HttpException(409, "Slack doesn't exist")

  //   return updateSlackById
  // }

  // public async deleteSlack(SlackId: string): Promise<Slack> {
  //   const deleteSlackById: Slack = await SlackModel.findByIdAndDelete(SlackId)
  //   if (!deleteSlackById) throw new HttpException(409, "Slack doesn't exist")

  //   return deleteSlackById
  // }
}
