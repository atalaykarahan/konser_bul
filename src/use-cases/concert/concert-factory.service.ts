import { Injectable } from "@nestjs/common";
import { ConcertResponseDto } from "../../core/dtos";
import { Concert } from "src/core/entities";



@Injectable()
export class ConcertFactoryService{
    createNewConcert(createConcertDto: ConcertResponseDto){
        const newConcert = new Concert();
        newConcert.artistName = createConcertDto.artistName;
        newConcert.country = createConcertDto.country;
        newConcert.date = createConcertDto.date;
        newConcert.ticketUrls = createConcertDto.ticketUrls;
        return newConcert;
    }

    updateConcert(updateConcertDto: ConcertResponseDto){
        const newConcert = new Concert();
        newConcert.artistName = updateConcertDto.artistName;
        newConcert.country = updateConcertDto.country;
        newConcert.date = updateConcertDto.date;
        newConcert.ticketUrls = updateConcertDto.ticketUrls;
        return newConcert;
    }

}