export interface SlackEvent {
  type: string
  event_ts: string
  user: string
  text: string
  ts: string
  channel: string
  channel_type: string
}

export interface Slack {
  id?: string
  type: string
  challenge?: string
  event?: SlackEvent
  token: string
  team_id?: string
  api_app_id?: string
  event_id?: string
  event_time?: number
  authed_users?: string[]
  authorizations?: string[]
}
