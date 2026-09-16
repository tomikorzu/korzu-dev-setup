import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";
import { Item } from "./item.model";
import { ItemsService } from "./items.service";

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  items() {
    return this.itemsService.findAll();
  }

  @Query(() => Item)
  item(@Args("id", { type: () => ID }) id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  createItem(@Args("input") input: CreateItemInput) {
    return this.itemsService.create(input);
  }

  @Mutation(() => Item)
  updateItem(
    @Args("id", { type: () => ID }) id: string,
    @Args("input") input: UpdateItemInput,
  ) {
    return this.itemsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeItem(@Args("id", { type: () => ID }) id: string) {
    await this.itemsService.remove(id);
    return true;
  }
}
