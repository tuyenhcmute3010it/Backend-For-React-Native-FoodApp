import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuItemDocument = HydratedDocument<MenuItem>;

// 💥 THIẾU CÁI NÀY!
@Schema({ timestamps: true }) // tự động tạo createdAt & updatedAt
export class MenuItem {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  basePrice: number;

  @Prop()
  image: string;

  @Prop()
  options: string[];

  @Prop({ default: false }) // nếu bạn dùng
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
