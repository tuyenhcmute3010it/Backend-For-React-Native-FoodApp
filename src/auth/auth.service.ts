import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  RegisterUserDto,
  VerifyCode,
  VerifyEmail,
} from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async register(registerUserDto: RegisterUserDto) {
    let user = await this.usersService.register(registerUserDto);
    this.mailService.handleSendEmail(registerUserDto.email);
    return {
      _id: user._id,
      timestamp: user.codeExpired, // Thêm 5 phút (5 phút * 60 giây * 1000 ms)
    };
  }
  async verifyCode(verifyCode: VerifyCode) {
    let user = await this.usersService.verifyCode(verifyCode);

    return user;
  }
  async verifyEmail(verifyEmail: VerifyEmail) {
    let user = await this.usersService.verifyEmail(verifyEmail);
    this.mailService.handleSendEmail(verifyEmail.email);
    return user;
  }
}
