import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDetailDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsString()
  option?: string;
}

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  restaurant: string; // ObjectId dạng string

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  totalQuantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  detail: CreateOrderDetailDto[];
}
