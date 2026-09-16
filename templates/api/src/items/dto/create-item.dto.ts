import { IsString, MinLength } from "class-validator";

export class CreateItemDto {
  @IsString()
  @MinLength(1)
  title!: string;
}
