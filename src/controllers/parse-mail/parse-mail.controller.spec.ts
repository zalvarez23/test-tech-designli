import { Test, TestingModule } from '@nestjs/testing';
import { ParseMailController } from './parse-mail.controller';
import { ParseMailService } from 'src/services/parse-mail/parse-mail.service';
import { MailDto } from 'src/dto/mail.dto';

describe('ParseMailController', () => {
  let controller: ParseMailController;
  let service: ParseMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParseMailController],
      providers: [ParseMailService],
    }).compile();

    controller = module.get<ParseMailController>(ParseMailController);
    service = module.get<ParseMailService>(ParseMailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('parseEmail', () => {
    it('should parse email with attachment and return result', async () => {
      // Arrange
      const mailDto: MailDto = {
        filePath: 'src/emails/test-mail-json.eml',
      };

      const expectedResult = { key: 'value' };

      jest
        .spyOn(service, 'parseAndExtractJson')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await controller.parseEmail(mailDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should parse email with URL and return result', async () => {
      // Arrange
      const mailDto: MailDto = {
        filePath: 'src/emails/test-mail-url-json.eml',
      };

      const expectedResult = { key: 'value' };

      jest
        .spyOn(service, 'parseAndExtractJson')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await controller.parseEmail(mailDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors thrown by ParseMailService', async () => {
      // Arrange
      const mailDto: MailDto = {
        filePath: 'src/emails/test-mail-json.eml',
      };

      const error = new Error('Service Error');

      jest.spyOn(service, 'parseAndExtractJson').mockRejectedValue(error);

      // Act & Assert
      await expect(controller.parseEmail(mailDto)).rejects.toThrow(
        'Service Error',
      );
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mailDto: MailDto = {
        filePath: '', // invalid filePath
      };

      // Act & Assert
      await expect(controller.parseEmail(mailDto)).rejects.toThrow(
        "ENOENT: no such file or directory, open ''",
      );
    });
  });
});
