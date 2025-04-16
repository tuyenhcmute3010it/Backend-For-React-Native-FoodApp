import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  RegisterUserDto,
  VerifyCode,
  VerifyEmail,
} from 'src/users/dto/create-user.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  // register
  @Public()
  @Post('/register')
  @ResponseMessage('Register a user')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  @Public()
  @ResponseMessage('Register a new user')
  @Post('/verify-code')
  verifyCode(@Body() verifyCode: VerifyCode) {
    return this.authService.verifyCode(verifyCode);
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('/verify-email')
  verifyEmail(@Body() verifyEmail: VerifyEmail) {
    return this.authService.verifyEmail(verifyEmail);
  }
}
