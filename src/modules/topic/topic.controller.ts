import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTopicDto, UpdateTopicDto } from './topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  createTopic(@Body() data: CreateTopicDto) {
    return this.topicService.createTopic(data);
  }

  @Get()
  readAllTopics() {
    return this.topicService.readAllTopics();
  }

  @Get(':id')
  readTopic(@Param('id') id) {
    return this.topicService.readTopic(id);
  }

  @Put(':id')
  updateTopic(@Param('id') id, @Body() data: UpdateTopicDto) {
    return this.topicService.updateTopic(id, data);
  }

  @Delete(':id')
  deleteTopic(@Param('id') id) {
    return this.topicService.deleteTopic(id);
  }
}
