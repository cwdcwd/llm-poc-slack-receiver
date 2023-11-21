import { Service } from 'typedi'
import { HttpException } from '@exceptions/HttpException'
import { Slack } from '@/interfaces/slacks.interface'
import { SlackModel } from '@/models/slacks.model'
import { pineconeConnection } from '@/database'

import { Document } from 'langchain/document'
// import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { logger } from '@/utils/logger'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''

@Service()
export class SlackService {
  constructor() {
    console.log('SlackService constructor')
  }

  public async findAllSlacks(): Promise<Slack[]> {
    const Slacks: Slack[] = await SlackModel.find()
    return Slacks
  }

  public async findSlackById(SlackId: string): Promise<Slack> {
    const findSlack: Slack = await SlackModel.findOne({ _id: SlackId })

    if (!findSlack) throw new HttpException(409, "Slack doesn't exist")

    return findSlack
  }

  public async createSlack(SlackData: Slack): Promise<Slack> {
    const findSlack: Slack = await SlackModel.findOne({ _id: SlackData._id })
    if (findSlack) throw new HttpException(409, `This id ${SlackData._id} already exists`)

    const createSlackData: Slack = await SlackModel.create({ ...SlackData })
    const { event } = SlackData
    const slackDoc = new Document({
      metadata: {
        userId: event.user,
        timestamp: event.event_ts,
        teamId: SlackData.team_id,
        channelId: event.channel,
      },
      pageContent: event.text,
    })
    const pineconeIndex = await pineconeConnection()
    const store = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }), { pineconeIndex })
    const docIds = await store.addDocuments([slackDoc])
    logger.info(`docIds: ${docIds}`)
    return createSlackData
  }

  public async updateSlack(SlackId: string, SlackData: Slack): Promise<Slack> {
    if (SlackData._id) {
      const findSlack: Slack = await SlackModel.findOne({ _id: SlackData._id })
      if (findSlack && findSlack._id != SlackId) throw new HttpException(409, `This id ${SlackData._id} already exists`)
    }

    const updateSlackById: Slack = await SlackModel.findByIdAndUpdate(SlackId, { SlackData })
    if (!updateSlackById) throw new HttpException(409, "Slack doesn't exist")

    return updateSlackById
  }

  public async deleteSlack(SlackId: string): Promise<Slack> {
    const deleteSlackById: Slack = await SlackModel.findByIdAndDelete(SlackId)
    if (!deleteSlackById) throw new Error("Slack doesn't exist") //HttpException(409, "Slack doesn't exist")

    return deleteSlackById
  }
}
