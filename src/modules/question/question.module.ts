import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../topic/topic.entity';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Topic, Tag, Question])],
  providers: [SubjectService, TopicService, TagService, QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
