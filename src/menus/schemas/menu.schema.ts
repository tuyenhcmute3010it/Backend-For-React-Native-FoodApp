import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { MenuItem } from 'src/menuitems/schemas/menuitem.schema';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ timestamps: true })
export class Menu {
  @Prop()
  title: string;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurant: Restaurant;

  // @Prop({
  //   type: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' } }],
  //   default: [],
  // })
  // menuItem: { _id: mongoose.Schema.Types.ObjectId ,  }[];
  @Prop({
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        title: String,
        description: String,
        basePrice: Number,
        image: String,
        options: [String], // Assuming options is an array of strings
      },
    ],
    default: [],
  })
  menuItem: {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    basePrice: number;
    image: string;
    options: string[];
  }[];
}
export const MenuSchema = SchemaFactory.createForClass(Menu);
