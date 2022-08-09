import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewController } from './interview.controller';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
