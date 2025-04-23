import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Menu, MenuDocument } from 'src/menus/schemas/menu.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: SoftDeleteModel<RestaurantDocument>,

    @InjectModel(Menu.name)
    private menuModel: SoftDeleteModel<MenuDocument>,
  ) {}
  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantModel.create(createRestaurantDto);
  }

  findAll() {
    return this.restaurantModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid restaurant ID');
    }

    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const menus = await this.menuModel
      .find({ restaurant: restaurant._id, isDeleted: false })
      .populate({
        path: 'menuItem._id',
        model: 'MenuItem',
        select: '_id title description basePrice image options',
      })
      .lean();

    const formattedMenus = menus.map((menu) => ({
      ...menu,
      menuItem: Array.isArray(menu.menuItem)
        ? menu.menuItem.map((item) => ({
            ...item._id,
          }))
        : [],
    }));

    return {
      ...restaurant.toObject(),
      menu: formattedMenus,
    };
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
  async findNewComer() {
    const recentRestaurants = await this.restaurantModel
      .find({ isActive: true, isDeleted: { $exists: false } })
      .sort({ createdAt: -1 })
      .limit(5);
    return recentRestaurants;
  }

  async findTopRating() {
    const recentRestaurants = await this.restaurantModel
      .find({ isActive: true, isDeleted: { $exists: false } })
      .sort({ rating: -1 })
      .limit(5);
    return recentRestaurants;
  }
  async findTopFreeship() {
    const recentRestaurants = await this.restaurantModel
      .find({ isActive: true, isDeleted: { $exists: false } })
      .limit(5);
    return recentRestaurants;
  }
}
