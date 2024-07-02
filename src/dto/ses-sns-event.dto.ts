import { IsString, ValidateNested, IsEmail, IsNumber } from 'class-validator';
import { Type, plainToInstance } from 'class-transformer';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import SesSnsEventTransformedDto from './ses-sns-event-transformed.dto';
import {
  checkDnsVerdict,
  extractRecipient,
  extractSender,
  getMonthFromTimestamp,
} from 'src/utils/validation.utils';

export class ActionDto {
  @IsString()
  type: string;

  @IsString()
  topicArn: string;
}

export class DkimVerdictDto {
  @IsString()
  status: string;
}

export class DmarcVerdictDto {
  @IsString()
  status: string;
}

export class SpfVerdictDto {
  @IsString()
  status: string;
}

export class VirusVerdictDto {
  @IsString()
  status: string;
}

export class SpamVerdictDto {
  @IsString()
  status: string;
}

export class ReceiptDto {
  @IsString()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsEmail({}, { each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => SpamVerdictDto)
  spamVerdict: SpamVerdictDto;

  @ValidateNested()
  @Type(() => VirusVerdictDto)
  virusVerdict: VirusVerdictDto;

  @ValidateNested()
  @Type(() => SpfVerdictDto)
  spfVerdict: SpfVerdictDto;

  @ValidateNested()
  @Type(() => DkimVerdictDto)
  dkimVerdict: DkimVerdictDto;

  @ValidateNested()
  @Type(() => DmarcVerdictDto)
  dmarcVerdict: DmarcVerdictDto;

  @IsString()
  dmarcPolicy: string;

  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}

export class MailDto {
  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  @IsString()
  messageId: string;

  @IsEmail({}, { each: true })
  destination: string[];

  headers: {
    name: string;
    value: string;
  }[];

  commonHeaders: {
    returnPath: string;
    from: string[];
    date: string;
    to: string[];
    messageId: string;
    subject: string;
  };
}

export class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}

export class EventDto {
  @IsString()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @IsString()
  eventSource: string;
}

@ApiExtraModels(
  ActionDto,
  DkimVerdictDto,
  DmarcVerdictDto,
  SpfVerdictDto,
  VirusVerdictDto,
  SpamVerdictDto,
  ReceiptDto,
  MailDto,
  SesDto,
  EventDto,
)
export class SesSnsEventDto {
  @ValidateNested()
  @Type(() => EventDto)
  Records: EventDto[];

  static toTransformedDto(eventDto: EventDto): SesSnsEventTransformedDto {
    const { ses } = eventDto;

    const transformedDto: SesSnsEventTransformedDto = {
      spam: ses?.receipt.spamVerdict.status === 'PASS',
      virus: ses?.receipt.virusVerdict.status === 'PASS',
      dns: checkDnsVerdict(ses?.receipt),
      mes: getMonthFromTimestamp(ses?.receipt.timestamp),
      retrasado: ses?.receipt.processingTimeMillis > 1000,
      emisor: extractSender(ses?.mail.source),
      receptor: ses?.mail.destination.map((email) => extractRecipient(email)),
    };

    return plainToInstance(SesSnsEventTransformedDto, transformedDto);
  }
}

export default SesSnsEventDto;
