import { IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'

// {
// 	"type": "message",
// "channel": "C123ABC456",
// 	"subtype": "channel_join",
// 	"text": "<@U123ABC456|bobby> has joined the channel",
// 	"ts": "1403051575.000407",
// 	"user": "U123ABC456"
// }

// {
//     "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
//     "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
//     "type": "url_verification"
// }

export class SlackEventDto {
  @IsString()
  public type: string

  @IsString()
  @IsOptional()
  public subtype: string

  @IsString()
  @IsOptional()
  public text: string

  @IsString()
  @IsOptional()
  public user: string

  @IsString()
  @IsOptional()
  public ts: string

  @IsString()
  @IsOptional()
  public channel: string

  @IsString()
  @IsOptional()
  public channel_type: string
}

export class CreateSlackDto {
  @IsString()
  public type: string

  @IsString()
  @IsOptional()
  public challenge: string

  @IsString()
  @IsOptional()
  public token: string

  @IsString()
  @IsOptional()
  public team_id: string

  @ValidateNested()
  @IsOptional()
  public event: SlackEventDto
}

export class UpdateSlackDto {
  @IsString()
  @IsNotEmpty()
  public _id: string

  @IsString()
  public type: string

  @IsString()
  @IsOptional()
  public challenge: string

  @IsString()
  @IsOptional()
  public token: string

  @IsString()
  @IsOptional()
  public team_id: string

  @ValidateNested()
  @IsOptional()
  public event: SlackEventDto
}
