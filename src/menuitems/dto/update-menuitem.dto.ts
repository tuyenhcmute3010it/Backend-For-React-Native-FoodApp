import { PartialType } from '@nestjs/swagger';
import { CreateMenuitemDto } from './create-menuitem.dto';

export class UpdateMenuitemDto extends PartialType(CreateMenuitemDto) {}
