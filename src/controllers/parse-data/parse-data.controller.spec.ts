import { Test, TestingModule } from '@nestjs/testing';
import { ParseDataController } from './parse-data.controller';
import { ParseDataService } from 'src/services/parse-data/parse-data.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  EventDto,
  SesSnsEventDto,
  ReceiptDto,
  MailDto,
} from 'src/dto/ses-sns-event.dto';
import SesSnsEventTransformedDto from 'src/dto/ses-sns-event-transformed.dto';
import {
  extractSender,
  checkDnsVerdict,
  extractRecipient,
  getMonthFromTimestamp,
} from 'src/utils/validation.utils';

describe('ParseDataController', () => {
  let controller: ParseDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParseDataController],
      providers: [ParseDataService],
    }).compile();

    controller = module.get<ParseDataController>(ParseDataController);
  });

  it('should be defined', () => {
    // Arrange & Act
    // No se requiere acción explícita para esta prueba

    // Assert
    expect(controller).toBeDefined();
  });
});

describe('SesSnsEventDto', () => {
  describe('Validation and Transformation', () => {
    it('should validate and transform EventDto correctly', async () => {
      // Arrange
      const validEventDto = new EventDto();
      validEventDto.eventVersion = '1.0';
      validEventDto.eventSource = 'source';

      // Act
      const errors = await validate(validEventDto);
      const transformedDto = SesSnsEventDto.toTransformedDto(validEventDto);

      // Assert
      expect(errors.length).toBe(0);
      expect(transformedDto).toBeDefined();
    });

    it('should validate and transform ReceiptDto correctly', async () => {
      // Arrange
      const validReceiptDto = new ReceiptDto();
      validReceiptDto.timestamp = '2024-07-03T12:00:00Z';
      validReceiptDto.processingTimeMillis = 500;
      validReceiptDto.recipients = ['test@example.com'];
      validReceiptDto.spamVerdict = { status: 'PASS' };
      validReceiptDto.virusVerdict = { status: 'FAIL' };
      validReceiptDto.spfVerdict = { status: 'PASS' };
      validReceiptDto.dkimVerdict = { status: 'PASS' };
      validReceiptDto.dmarcVerdict = { status: 'PASS' };
      validReceiptDto.dmarcPolicy = 'none';
      validReceiptDto.action = { type: 'action', topicArn: 'arn:topic' };

      // Act
      const errors = await validate(validReceiptDto);
      const transformedDto = plainToClass(
        SesSnsEventTransformedDto,
        validReceiptDto,
      );

      // Assert
      expect(errors.length).toBe(0);
      expect(transformedDto).toBeDefined();
    });
  });

  describe('Util Functions', () => {
    it('should check DNS verdict correctly', () => {
      // Arrange
      const receiptDto = new ReceiptDto();
      receiptDto.spfVerdict = { status: 'FAIL' };
      receiptDto.virusVerdict = { status: 'PASS' };
      receiptDto.dmarcVerdict = { status: 'PASS' };

      // Act
      const dnsVerdict = checkDnsVerdict(receiptDto);

      // Assert
      expect(dnsVerdict).toEqual(false);
    });

    it('should extract sender correctly', () => {
      // Arrange
      const mailDto = new MailDto();
      mailDto.source = 'sender@example.com';

      // Act
      const sender = extractSender(mailDto.source);

      // Assert
      expect(sender).toEqual('sender');
    });

    it('should extract recipient correctly', () => {
      // Arrange
      const mailDto = new MailDto();
      mailDto.destination = [
        'recipient1@example.com',
        'recipient2@example.com',
      ];

      // Act
      const recipients = mailDto.destination.map((email) =>
        extractRecipient(email),
      );

      // Assert
      expect(recipients).toEqual([
        'recipient1', // without domain
        'recipient2',
      ]);
    });

    it('should get month from timestamp correctly', () => {
      // Arrange
      const timestamp = '2024-07-03T12:00:00Z';

      // Act
      const month = getMonthFromTimestamp(timestamp);

      // Assert
      expect(month).toEqual('July');
    });
  });
});
