import axios from "axios";
import { customSearch } from "..";
import { SearchResult } from "../models/search";
import cheerio from "cheerio";

class SearchService {
  //#region SEARCH CONCERT

  async searchConcerts(
    artist: string,
    country: string
  ): Promise<SearchResult[]> {
    const searchQuery = `${artist} concert tickets ${country}`;
    const searchResults: SearchResult[] = [];

    //google search
    const searchResponse = await customSearch.cse.list({
      auth: process.env.GOOGLE_API_KEY,
      cx: process.env.SEARCH_ENGINE_ID,
      q: searchQuery,
      num: 10,
    });

    if (searchResponse.data.items) {
      for (const item of searchResponse.data.items) {
        try {
          const pageResponse = await axios.get(item.link!, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
          });

          const $ = cheerio.load(pageResponse.data);

          const bodyContent = $("body").text().replace(/\s+/g, " ").trim();

          searchResults.push({ url: item.link!, bodyContent: bodyContent });
        } catch (error) {
          console.error(`Hata: ${item.link} için scraping yapılamadı:`, error);
          continue;
        }
      }
    }

    return searchResults;
  }

  //#endregion
}

export const searchService = new SearchService();
