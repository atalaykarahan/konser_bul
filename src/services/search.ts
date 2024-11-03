import { customSearch } from "..";
import { SearchResult } from "../models/search";
import puppeteer from 'puppeteer';

class SearchService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async scrapePage(url: string): Promise<string> {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });

      console.log(`Ziyaret ediliyor: ${url}`);
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Popup/cookie banner'ları kapatmaya çalış
      try {
        const closeSelectors = [
          '[aria-label="Close"]',
          '.cookie-banner button',
          '#cookie-consent button',
          'button:contains("Kabul")',
          'button:contains("Tamam")',
          '.modal-close'
        ];

        for (const selector of closeSelectors) {
          await page.evaluate((sel) => {
            const element = document.querySelector(sel);
            if (element) element.click();
          }, selector);
        }
      } catch (e) {
        // Popup işlemi başarısız olsa da devam et
      }

      // Sayfanın body içeriğini al
      const bodyContent = await page.evaluate(() => {
        // Gereksiz elementleri temizle
        const elementsToRemove = document.querySelectorAll('header, footer, nav, script, style, noscript');
        elementsToRemove.forEach(el => el.remove());

        return document.body.innerText
          .replace(/\s+/g, ' ')
          .trim();
      });

      return bodyContent;

    } catch (error) {
      console.error(`Scraping hatası (${url}):`, error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  async searchConcerts(artist: string, country: string): Promise<SearchResult[]> {
    try {
      // Hariç tutulacak domainleri -site: operatörü ile birleştir
      const excludeSites = [
        'instagram.com',
        'facebook.com',
        'twitter.com',
        'youtube.com',
        'tiktok.com',
        'linkedin.com',
        'pinterest.com',
        'wordpress.com',
        'blogspot.com',
        'medium.com',
        'reddit.com',
        'wikipedia.org'
      ].map(domain => `-site:${domain}`).join(' ');

      // Arama sorgusunu oluştur
      const searchQuery = `"${artist.toLowerCase()}" bileti satın al ${excludeSites}`;

      console.log(`Arama sorgusu: ${searchQuery}`);

      const searchResponse = await customSearch.cse.list({
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.SEARCH_ENGINE_ID,
        q: searchQuery, 
        num: 10,
        lr: 'lang_tr',
        dateRestrict: 'y1',
        exactTerms: artist
      });

      console.log("Bulunan websitelerin linkleri:", 
        searchResponse.data.items?.map(item => item.link) || []);

      if (searchResponse.data.items) {
        for (const item of searchResponse.data.items) {
          try {
            await this.delay(2000 + Math.random() * 2000);
            const bodyContent = await this.scrapePage(item.link!);

            if (bodyContent && bodyContent.length > 100) {
              return [
                {
                  url: item.link!,
                  bodyContent: bodyContent
                }
              ];
            }

          } catch (error) {
            console.error(`${item.link} için scraping başarısız:`, {
              message: error instanceof Error ? error.message : 'Bilinmeyen hata',
              url: item.link
            });
            continue;
          }
        }
      }

      return [];

    } catch (error) {
      console.error('Search service hatası:', error);
      throw new Error('Arama işlemi başarısız oldu');
    }
  }

}

export const searchService = new SearchService();
