import { Concert } from '../entities';

export abstract class IConcertProviderServices {
  abstract searchUpcomingConcerts(artistName: string, country: string): Promise<Concert[]>;
  abstract getEventDetails(concertId: string): Promise<Concert>;
} 