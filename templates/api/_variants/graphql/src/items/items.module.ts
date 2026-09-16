import { Module } from "@nestjs/common";
import { ItemsResolver } from "./items.resolver";
import { ItemsService } from "./items.service";

@Module({
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
