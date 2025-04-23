import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMenuitemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNumber()
  @Min(0)
  basePrice: number;

  @IsString()
  @IsOptional()
  image: string; // Có thể là một ảnh URL hoặc tên file ảnh

  @IsArray()
  @IsOptional()
  options: string[]; // Các tùy chọn (nếu có)

  createdAt: Date;

  updatedAt: Date;
}
