import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  // @ApiProperty({ description: `category's name`}
  name: string;
}
