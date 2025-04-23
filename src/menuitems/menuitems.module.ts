import { Module } from '@nestjs/common';
import { MenuitemsService } from './menuitems.service';
import { MenuitemsController } from './menuitems.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItem, MenuItemSchema } from './schemas/menuitem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  controllers: [MenuitemsController],
  providers: [MenuitemsService],
})
export class MenuitemsModule {}
