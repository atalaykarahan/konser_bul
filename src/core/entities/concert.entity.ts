import { TicketUrl } from './';

export class Concert {
  id: string;
  artistName: string;
  country: string;
  date: Date;
  ticketUrls: TicketUrl[];
}
