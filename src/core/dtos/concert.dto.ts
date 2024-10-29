import { IsNotEmpty, IsString } from "class-validator";
import { TicketUrl } from "../entities";

export class SearchConcertDto {
  @IsString()
  @IsNotEmpty()
  artist: string;
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ConcertResponseDto {
  id: string;
  artistName: string;
  country: string;
  date: Date;
  ticketUrls: TicketUrl[];
}
