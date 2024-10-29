import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ITicketServices } from "src/core/abstracts";
import { Concert } from "src/core/entities";
import * as cheerio from "cheerio";

@Injectable()
export class BiletixService implements ITicketServices {
  private readonly BASE_URL = "https://www.biletix.com";

  async searchConcert(artistName: string, country: string): Promise<Concert[]> {
    // Implement biletix api logic
    try {
      // Sadece Türkiye için arama yap
      if (
        country.toLowerCase() !== "türkiye" &&
        country.toLowerCase() !== "turkey"
      ) {
        return [];
      }

      const searchUrl = `${this.BASE_URL}/search/${encodeURIComponent(
        artistName
      )}`;
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);
      const concerts: Concert[] = [];

      return concerts;
    } catch (error) {
      console.error("Biletix search error;", error);
      return [];
    }
  }

  async checkTicketAvailability(concert: Concert): Promise<boolean> {
    return Promise.resolve(true);
  }

  async concertFound(concert: Concert): Promise<boolean> {
    console.log(`Concert found in Biletix: ${concert.artistName}`);
    return Promise.resolve(true);
  }
}
