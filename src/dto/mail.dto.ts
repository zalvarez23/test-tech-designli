import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MailDto {
  @ApiProperty({
    description: 'Path to the email file',
    example: 'src/emails/test-mail-url-json.eml',
  })
  @IsNotEmpty()
  filePath: string;
}
