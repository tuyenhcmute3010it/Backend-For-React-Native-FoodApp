import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  // @Get()
  // findAll() {
  //   return this.restaurantsService.findAll();
  // }
  @Public()
  @Get('newcomer')
  @ResponseMessage('Get list restaurant new comer')
  findNewComer() {
    return this.restaurantsService.findNewComer();
  }
  @Get('top-rating')
  findTopRating() {
    return this.restaurantsService.findTopRating();
  }
  @Get('top-freeship')
  findTopFreeship() {
    return this.restaurantsService.findTopFreeship();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
