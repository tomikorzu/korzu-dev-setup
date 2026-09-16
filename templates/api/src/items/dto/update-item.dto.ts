import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
