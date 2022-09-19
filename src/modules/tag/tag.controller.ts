import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTagDto, EditTagDto, TagDto } from './tag.dto';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';

@ApiTags('tag')
// @UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: 'Read a list of all tags - id and title only' })
  @Get('/list')
  async readAllTags(): Promise<
    SuccessResponseDto<Pick<TagDto, 'id' | 'title'>[]>
  > {
    const tagsList = await this.tagService.readAllTags();

    return {
      message: SUCCESS,
      data: tagsList,
    };
  }

  @ApiOperation({ summary: 'Read a tag by ID' })
  @Get(':id')
  async readTag(@Param('id') id): Promise<SuccessResponseDto<TagDto>> {
    const tag = await this.tagService.readTag(id);

    return {
      message: SUCCESS,
      data: tag,
    };
  }

  @ApiOperation({ summary: 'Read a list of tags' })
  @Get()
  async readTagsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<Tag[]>> {
    const tags = await this.tagService.readTagsList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: tags.listData,
      pagination: tags.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a tag' })
  async createTag(
    @Body() data: CreateTagDto,
  ): Promise<SuccessResponseDto<TagDto>> {
    const tag = await this.tagService.createTag(data);

    return {
      message: SUCCESS,
      data: tag,
    };
  }

  @ApiOperation({ summary: 'Update a tag' })
  @Put(':id')
  async updateTag(
    @Param('id') id,
    @Body() data: EditTagDto,
  ): Promise<SuccessResponseDto<TagDto>> {
    const tag = await this.tagService.updateTag(id, data);

    return {
      message: SUCCESS,
      data: tag,
    };
  }

  @ApiOperation({ summary: 'Delete a tag' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.tagService.deleteTag(id);

    return {
      message: SUCCESS,
    };
  }
}
