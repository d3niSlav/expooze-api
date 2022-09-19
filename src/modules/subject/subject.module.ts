import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectController } from './subject.controller';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { TopicModule } from '../topic/topic.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    forwardRef(() => TopicModule),
    forwardRef(() => TagModule),
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
