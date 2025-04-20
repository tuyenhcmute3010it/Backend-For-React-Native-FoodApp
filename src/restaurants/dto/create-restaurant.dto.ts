import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty({
    message: 'name Khong duoc de trong',
  })
  name: string;

  @IsNotEmpty({
    message: 'phone Khong duoc de trong',
  })
  phone: string;
  @IsNotEmpty({
    message: 'address Khong duoc de trong',
  })
  address: string;
  @IsNotEmpty({
    message: 'email Khong duoc de trong',
  })
  email: string;
  @IsNotEmpty({
    message: 'rating Khong duoc de trong',
  })
  rating: number;

  @IsNotEmpty({
    message: 'image Khong duoc de trong',
  })
  image: string;
  @IsNotEmpty({
    message: 'isActive Khong duoc de trong',
  })
  isActive: boolean;
}
