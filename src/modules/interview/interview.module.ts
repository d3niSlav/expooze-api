import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewController } from './interview.controller';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { ProgrammingLanguage } from '../programmingLanguage/programming-language.entity';
import { ProgrammingLanguageService } from '../programmingLanguage/programming-language.service';
import { Subject } from '../subject/subject.entity';
import { SubjectService } from '../subject/subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview, ProgrammingLanguage, Subject]),
  ],
  providers: [InterviewService, ProgrammingLanguageService, SubjectService],
  controllers: [InterviewController],
})
export class InterviewModule {}
