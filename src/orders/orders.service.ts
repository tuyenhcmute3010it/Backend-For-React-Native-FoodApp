import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: SoftDeleteModel<OrderDocument>,
  ) {}

  async findAll(user: IUser) {
    return this.orderModel
      .find({ user: user._id, isDeleted: false })
      .populate('restaurant')
      .exec();
  }

  async create(createOrderDto: CreateOrderDto, user: IUser) {
    const order = new this.orderModel({
      ...createOrderDto,
      user: user._id,
      isDeleted: false,
      deletedAt: null,
    });
    const savedOrder = await order.save();
    return {
      order: savedOrder,
      user,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
