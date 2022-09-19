import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CandidateController } from './candidate.controller';
import { Candidate } from './candidate.entity';
import { CandidateService } from './candidate.service';
import { PositionModule } from '../position/position.module';
import { WorkExperienceModule } from '../work-experience/work-experience.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    PositionModule,
    WorkExperienceModule,
  ],
  providers: [CandidateService],
  controllers: [CandidateController],
  exports: [CandidateService],
})
export class CandidateModule {}
