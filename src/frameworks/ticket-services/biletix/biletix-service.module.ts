import { Module } from "@nestjs/common";
import { ITicketServices } from "src/core/abstracts";
import { BiletixService } from "./biletix-service.service";

@Module({
  providers: [
    {
      provide: ITicketServices,
      useClass: BiletixService,
    },
  ],
  exports: [ITicketServices],
})
export class BietixServicesModule {}
