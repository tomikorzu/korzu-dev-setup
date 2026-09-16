import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class UpdateItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
