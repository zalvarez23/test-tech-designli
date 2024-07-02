import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ParseDataService } from 'src/services/parse-data/parse-data.service';
import SesSnsEventDto from 'src/dto/ses-sns-event.dto';
import SesSnsEventTransformedDto from 'src/dto/ses-sns-event-transformed.dto';
import { SES_SNS_EVENT_SCHEMA } from 'src/schemas/ses-sns-event.schema';
import { GenericError } from 'src/helpers/generic-error.helper';
import { ResponseDescription } from 'src/helpers/response.helper';

@Controller('parse-data')
export class ParseDataController {
  constructor(private readonly parseService: ParseDataService) {}

  @ApiOperation({ summary: 'Parse SES SNS Event' })
  @ApiBody({
    schema: SES_SNS_EVENT_SCHEMA,
  })
  @ApiResponse({ status: 200, type: SesSnsEventTransformedDto })
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
  @Post()
  parseJson(
    @Body(ValidationPipe) sesSnsEventDto: SesSnsEventDto,
  ): SesSnsEventTransformedDto {
    return this.parseService.mapToTransformedDto(sesSnsEventDto);
  }
}
