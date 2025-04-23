import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import {
  MenuItem,
  MenuItemSchema,
} from 'src/menuitems/schemas/menuitem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuSchema },
      { name: MenuItem.name, schema: MenuItemSchema }, // << phải có dòng này
    ]),
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
