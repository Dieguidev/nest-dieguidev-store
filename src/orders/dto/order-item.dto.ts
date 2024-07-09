import { isDecimal, IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";



export class OrderItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
