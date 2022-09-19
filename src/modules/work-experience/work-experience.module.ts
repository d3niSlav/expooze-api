import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkExperienceController } from './work-experience.controller';
import { WorkExperience } from './work-experience.entity';
import { WorkExperienceService } from './work-experience.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience]), TagModule],
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule {}
