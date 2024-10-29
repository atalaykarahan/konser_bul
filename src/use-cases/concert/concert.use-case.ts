import { Injectable } from "@nestjs/common";
import { IDataServices, ITicketServices } from "src/core/abstracts"
import { Concert } from "src/core/entities"

@Injectable()
export class ConcertUseCases {
  constructor(
    private dataServices: IDataServices,
    private ticketServices: ITicketServices,
  ) {}



// getAllConcerts(): Promise<Concert[]> {
//   return this.dataServices.concerts.getAll();
// }

// getConcertById(id: any): Promise<Concert> {
//   return this.dataServices.concerts.get(id);
// }

async searchConcerts(artistName: string, country:string): Promise<Concert[]{

    try{
    //Bulunan konserleri ticket servisinden al
    const foundConcerts = await this.ticketServices.searchConcert(artistName, country);

    // Bu projede herhangi bir veritabanı kullanılmıyor.
    //Bulunan konserleri veritabanına kaydet
    // for(const concert of foundConcerts){
    //     await this.dataServices.concerts.create(concert);
    // }

    return foundConcerts;
    }catch(error){
        throw error;
    }
}

}