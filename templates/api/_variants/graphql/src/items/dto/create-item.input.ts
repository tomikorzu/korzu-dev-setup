import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class CreateItemInput {
  @Field()
  @IsString()
  @MinLength(1)
  title!: string;
}
