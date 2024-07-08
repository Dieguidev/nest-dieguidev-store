import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  readonly customerId: string;
}
