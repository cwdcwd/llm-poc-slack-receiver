import { model, Schema, Document } from 'mongoose'
import { Slack } from '@/interfaces/slacks.interface'

// {
// 	"type": "message",
// "channel": "C123ABC456",
// 	"subtype": "channel_join",
// 	"text": "<@U123ABC456|bobby> has joined the channel",
// 	"ts": "1403051575.000407",
// 	"user": "U123ABC456"
// }

// {
//   token: 'ySoHetVH9nZFM2PQulb7kXP7',
//   team_id: 'T02E4N6Q3',
//   context_team_id: 'T02E4N6Q3',
//   context_enterprise_id: null,
//   api_app_id: 'AMA351ELT',
//   event: {
//     client_msg_id: 'bfd7dcea-7680-4fed-bc4d-c0ab81eff62f',
//     type: 'message',
//     text: 'test',
//     user: 'U02E4N6Q5',
//     ts: '1698943300.096419',
//     blocks: [ [Object] ],
//     team: 'T02E4N6Q3',
//     channel: 'D1KEMTW5V',
//     event_ts: '1698943300.096419',
//     channel_type: 'im'
//   },
//   type: 'event_callback',
//   event_id: 'Ev0640JY5AG3',
//   event_time: 1698943300,
//   authed_users: [ 'U02E4N6Q5' ],
//   authorizations: [
//     {
//       enterprise_id: null,
//       team_id: 'T02E4N6Q3',
//       user_id: 'U02E4N6Q5',
//       is_bot: false,
//       is_enterprise_install: false
//     }
//   ],
//   is_ext_shared_channel: false,
//   event_context: '4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUMDJFNE42UTMiLCJhaWQiOiJBTUEzNTFFTFQiLCJjaWQiOiJEMUtFTVRXNVYifQ'
// }

const SlackSchema: Schema = new Schema({
  event_id: {
    type: String,
    required: true,
    unique: true,
  },
  team_id: {
    type: String,
    required: false,
  },
  event: {
    channel: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    ts: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
})

export const SlackModel = model<Slack & Document>('Slack', SlackSchema)
