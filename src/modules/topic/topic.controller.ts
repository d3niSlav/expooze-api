import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TopicService } from './topic.service';
import { CreateTopicDto, EditTopicDto, TopicDto } from './topic.dto';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { SUCCESS } from '../../utils/constants';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ summary: 'Read a list of topics' })
  @Get()
  async readSubjectsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<TopicDto[]>> {
    const topics = await this.topicService.readTopicsList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: topics.listData,
      pagination: topics.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Get('/list')
  readAllTopics() {
    return this.topicService.readAllTopics();
  }

  @Post()
  @ApiOperation({ summary: 'Create a topic' })
  async createTopic(
    @Body() data: CreateTopicDto,
  ): Promise<SuccessResponseDto<TopicDto>> {
    const topic = await this.topicService.createTopic(data);

    return {
      message: SUCCESS,
      data: topic,
    };
  }

  @ApiOperation({ summary: 'Read a topic by ID' })
  @Get(':id')
  async readTopic(@Param('id') id): Promise<SuccessResponseDto<TopicDto>> {
    const topic = await this.topicService.readTopic(id);

    return {
      message: SUCCESS,
      data: topic,
    };
  }

  @ApiOperation({ summary: 'Update a topic' })
  @Put(':id')
  async updateTopic(
    @Param('id') id,
    @Body() data: EditTopicDto,
  ): Promise<SuccessResponseDto<TopicDto>> {
    const topic = await this.topicService.updateTopic(id, data);

    return {
      message: SUCCESS,
      data: topic,
    };
  }

  @ApiOperation({ summary: 'Delete a topic' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.topicService.deleteTopic(id);

    return {
      message: SUCCESS,
    };
  }
}
