import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewController } from './interview.controller';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { ProgrammingLanguage } from '../programmingLanguage/programming-language.entity';
import { ProgrammingLanguageService } from '../programmingLanguage/programming-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interview, ProgrammingLanguage])],
  providers: [ProgrammingLanguageService, InterviewService],
  controllers: [InterviewController],
  exports: [InterviewService],
})
export class InterviewModule {}
