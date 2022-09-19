import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewController } from './interview.controller';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { ProgrammingLanguage } from '../programmingLanguage/programming-language.entity';
import { ProgrammingLanguageService } from '../programmingLanguage/programming-language.service';
import { PositionModule } from '../position/position.module';
import { CandidateModule } from '../candidate/candidate.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview, ProgrammingLanguage]),
    PositionModule,
    CandidateModule,
    TagModule,
  ],
  providers: [ProgrammingLanguageService, InterviewService],
  controllers: [InterviewController],
  exports: [InterviewService],
})
export class InterviewModule {}
