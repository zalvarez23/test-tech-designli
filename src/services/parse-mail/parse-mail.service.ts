import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import * as fs from 'fs';
import {
  extractJsonFromAttachmentIfAvailable,
  extractJsonFromBody,
} from 'src/utils/mail.utils';

@Injectable()
export class ParseMailService {
  async parseAndExtractJson(filePath: string): Promise<any> {
    // Leer y parsear el correo electrónico
    const emailContent = fs.readFileSync(filePath);
    const parsedMail = await simpleParser(emailContent);

    // Intentar extraer JSON del adjunto
    const jsonFromAttachment = extractJsonFromAttachmentIfAvailable(parsedMail);
    if (jsonFromAttachment) {
      return jsonFromAttachment;
    }

    // Si no hay JSON en los adjuntos, extraer del cuerpo del correo o URL
    return await extractJsonFromBody(parsedMail);
  }
}
