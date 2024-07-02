import { MONTH_NAMES } from 'src/constants/month.constans';
import { ReceiptDto } from 'src/dto/ses-sns-event.dto';

export function checkDnsVerdict(receipt: ReceiptDto): boolean {
  return (
    receipt?.spfVerdict?.status === 'PASS' &&
    receipt?.dkimVerdict?.status === 'PASS' &&
    receipt?.dmarcVerdict?.status === 'PASS'
  );
}
export function getMonthFromTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const monthNames = MONTH_NAMES;
  return monthNames[date.getMonth()];
}

export function extractSender(source: string): string {
  // Podemos utilizar regex, pero para este caso no lo veo tan necesario : source.match(/^([^@]*)@/)?.[1] || '';
  return source?.split('@')[0];
}

export function extractRecipient(email: string): string {
  return email.split('@')[0];
}
