import { ParsedMail } from 'mailparser';

/**
 * Busca y devuelve el contenido JSON adjunto en el correo electrónico.
 * @param parsedMail El objeto ParsedMail generado por mailparser.
 * @returns El objeto JSON encontrado.
 * @throws Error si no se encuentra JSON válido.
 */
export function extractJsonFromAttachmentIfAvailable(
  parsedMail: ParsedMail,
): any {
  const attachments = parsedMail.attachments || [];

  const jsonAttachment = attachments.find(
    (attachment) => attachment.contentType === 'application/json',
  );

  if (jsonAttachment) {
    return JSON.parse(jsonAttachment.content.toString());
  }

  // Si no se encuentra un adjunto con JSON, retornar null o lanzar un error según lo prefieras
  return null;
}

/**
 * Busca y devuelve el contenido JSON dentro del cuerpo del correo o a través de URLs.
 * @param parsedMail El objeto ParsedMail generado por mailparser.
 * @returns El objeto JSON encontrado.
 * @throws Error si no se encuentra JSON válido.
 */
export async function extractJsonFromBody(
  parsedMail: ParsedMail,
): Promise<any> {
  const textBody = parsedMail.text || '';

  const jsonUrlRegex = /(https?:\/\/[^\s]+)/g;
  let match;
  while ((match = jsonUrlRegex.exec(textBody)) !== null) {
    const url = match[1];
    try {
      const response = await fetch(url);
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        }
      } else {
        throw new Error(
          `Failed to fetch JSON from ${url}: ${response.statusText}`,
        );
      }
    } catch (error) {
      throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
    }
  }

  throw new Error('No JSON found in email body');
}
