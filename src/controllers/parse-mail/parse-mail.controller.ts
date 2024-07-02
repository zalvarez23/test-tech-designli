import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { MailDto } from 'src/dto/mail.dto';
import { GenericError } from 'src/helpers/generic-error.helper';
import { ResponseDescription } from 'src/helpers/response.helper';
import { ParseMailService } from 'src/services/parse-mail/parse-mail.service';

@Controller('parse-mail')
export class ParseMailController {
  constructor(private readonly mailParserService: ParseMailService) {}

  @ApiBadRequestResponse({
    type: GenericError,
    description: ResponseDescription.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    type: GenericError,
    description: ResponseDescription.FEATURE_FLAG_NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({
    type: GenericError,
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: GenericError,
    description: ResponseDescription.API_GATEWAY_TIMEOUT,
  })
  @Get()
  async parseEmail(@Query(ValidationPipe) mailDto: MailDto) {
    const result = await this.mailParserService.parseAndExtractJson(
      mailDto.filePath,
    );
    return result;
  }
}
