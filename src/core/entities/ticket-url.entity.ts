export class TicketUrl {
  provider: string;
  url: string;
  available: boolean;
  price?: {
    amount: number;
    currency: string;
  };
}
