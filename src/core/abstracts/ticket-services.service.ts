import { Concert } from '../entities';

export abstract class ITicketServices {
  abstract searchConcert(artistName: string, country: string): Promise<Concert[]>;
  abstract checkTicketAvailability(concert: Concert): Promise<boolean>;
} 