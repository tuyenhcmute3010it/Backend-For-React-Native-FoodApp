// orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

// Định nghĩa chi tiết từng món trong đơn hàng
@Schema()
export class OrderDetail {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  image: string;

  @Prop() // option có thể có hoặc không
  option?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date })
  deletedAt: Date | null;
}

const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

// Định nghĩa schema cho Order
@Schema({ timestamps: true }) // tự động tạo createdAt và updatedAt
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  })
  restaurant: mongoose.Types.ObjectId;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  totalQuantity: number;

  @Prop({ type: [OrderDetailSchema], required: true })
  detail: OrderDetail[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date })
  deletedAt: Date | null;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
