import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
export class MenuItemRefDto {
  @IsMongoId()
  _id: string;
}

export class CreateMenuDto {
  @IsNotEmpty({
    message: 'title Khong duoc de trong',
  })
  title: string;
  //   @IsObject({
  //     message: 'restaurant must be a object',
  //   })

  @IsMongoId()
  readonly restaurant: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemRefDto)
  menuItem: MenuItemRefDto[];
}
