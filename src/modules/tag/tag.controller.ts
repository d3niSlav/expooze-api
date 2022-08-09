import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTagDto, UpdateTagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@Body() data: CreateTagDto) {
    return this.tagService.createTag(data);
  }

  @Get()
  readAllTags() {
    return this.tagService.readAllTags();
  }

  @Get(':id')
  readTag(@Param('id') id) {
    return this.tagService.readTag(id);
  }

  @Put(':id')
  updateTag(@Param('id') id, @Body() data: UpdateTagDto) {
    return this.tagService.updateTag(id, data);
  }

  @Delete(':id')
  deleteTag(@Param('id') id) {
    return this.tagService.deleteTag(id);
  }
}
