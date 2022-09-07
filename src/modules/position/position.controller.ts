import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePositionDto, UpdatePositionDto } from './position.dto';
import { PositionService } from './position.service';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  createPosition(@Body() data: CreatePositionDto) {
    return this.positionService.createPosition(data);
  }

  @Get()
  readAllPositions() {
    return this.positionService.readAllPositions();
  }

  @Get(':id')
  readPosition(@Param('id') id) {
    return this.positionService.readPosition(id);
  }

  @Put(':id')
  updatePosition(@Param('id') id, @Body() data: UpdatePositionDto) {
    return this.positionService.updatePosition(id, data);
  }

  @Delete(':id')
  deletePosition(@Param('id') id) {
    return this.positionService.deletePosition(id);
  }
}
