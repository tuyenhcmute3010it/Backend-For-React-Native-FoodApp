import { Injectable } from '@nestjs/common';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';
import { MenuItem, MenuItemDocument } from './schemas/menuitem.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class MenuitemsService {
  constructor(
    @InjectModel(MenuItem.name)
    private menuItemModel: SoftDeleteModel<MenuItemDocument>,
  ) {}
  create(createMenuitemDto: CreateMenuitemDto) {
    console.log(createMenuitemDto);
    return this.menuItemModel.create(createMenuitemDto);
  }

  findAll() {
    return `This action returns all menuitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuitem`;
  }

  update(id: number, updateMenuitemDto: UpdateMenuitemDto) {
    return `This action updates a #${id} menuitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuitem`;
  }
}
