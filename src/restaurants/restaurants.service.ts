import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: SoftDeleteModel<RestaurantDocument>,
  ) {}
  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
  // async findNewComer() {
  //   const recentRestaurants = await this.restaurantModel
  //     .find({})
  //     .sort({ createdAt: -1 })
  //     .limit(3);
  //   return recentRestaurants;
  // }
  async findNewComer() {
    // const recentRestaurants = await this.restaurantModel
    //   .find({
    //     isActive: true,
    //     $or: [{ isDeleted: { $exists: false } }],
    //   })
    //   .sort({ createdAt: -1 })
    //   .limit(3);
    const recentRestaurants = await this.restaurantModel.find();
    console.log(recentRestaurants);
    return recentRestaurants;
  }
  findTopRating() {}
  findTopFreeship() {}
}
