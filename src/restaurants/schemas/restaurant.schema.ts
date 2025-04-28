import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Menu } from 'src/menus/schemas/menu.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsString()
  phone: string;

  @Prop()
  @IsString()
  address: string;

  @Prop()
  @IsString()
  email: string;

  @Prop()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @Prop()
  image: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Menu.name })
  // menu: Menu;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
  menu: Menu[];
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
  @Prop()
  isLike: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
