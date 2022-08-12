import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicController } from './topic.controller';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';
import { Subject } from '../subject/subject.entity';
import { SubjectService } from '../subject/subject.service';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Tag, Topic])],
  providers: [SubjectService, TagService, TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}
