import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from 'src/restaurants/schemas/restaurant.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: SoftDeleteModel<MenuDocument>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const createdMenu = new this.menuModel({
      title: createMenuDto.title,
      restaurant: createMenuDto.restaurant,
      menuItem: createMenuDto.menuItem, // <-- mảng object {_id: ...}
    });

    await createdMenu.save();

    return this.menuModel
      .findById(createdMenu._id)
      .populate('restaurant')
      .populate('menuItem._id'); // Populate từng menu item
  }

  findAll() {
    return `This action returns all menus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
