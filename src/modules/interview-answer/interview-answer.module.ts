import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewAnswer } from './interview-answer.entity';
import { InterviewAnswerController } from './interview-answer.controller';
import { InterviewAnswerService } from './interview-answer.service';
import { InterviewModule } from '../interview/interview.module';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewAnswer]), InterviewModule],
  providers: [InterviewAnswerService],
  controllers: [InterviewAnswerController],
  exports: [InterviewAnswerService],
})
export class InterviewAnswerModule {}
