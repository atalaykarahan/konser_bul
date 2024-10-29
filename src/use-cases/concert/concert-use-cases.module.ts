import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services/data-services/data-services.module";
import { ConcertUseCases } from "./concert.use-case";
import { ConcertFactoryService } from "./concert-factory.service";

@Module({
  imports: [DataServicesModule],
  providers: [ConcertFactoryService, ConcertUseCases],
  exports: [ConcertFactoryService, ConcertUseCases],
})
export class ConcertUseCasesModule {}
