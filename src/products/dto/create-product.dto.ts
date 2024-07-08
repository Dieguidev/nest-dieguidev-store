import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  // @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  // @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  // @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  // @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  // @ApiProperty()
  readonly image: string;
}
