import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import SesSnsEventDto from 'src/dto/ses-sns-event.dto';
import SesSnsEventTransformedDto from 'src/dto/ses-sns-event-transformed.dto';

@Injectable()
export class ParseDataService {
  mapToTransformedDto(
    sesSnsEventDto: SesSnsEventDto,
  ): SesSnsEventTransformedDto {
    try {
      const eventDtoFirstRecord = sesSnsEventDto?.Records?.[0];

      if (!eventDtoFirstRecord) {
        throw new Error('No records found.');
      }

      return SesSnsEventDto.toTransformedDto(eventDtoFirstRecord);
    } catch (error) {
      throw new NotFoundException(
        HttpException.createBody(error.message, error.name, error.status),
        error.status,
      );
    }
  }
}
