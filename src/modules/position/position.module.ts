import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PositionController } from './position.controller';
import { Position } from './position.entity';
import { PositionService } from './position.service';
import { JobTitleModule } from '../job-title/job-title.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), JobTitleModule],
  providers: [PositionService],
  controllers: [PositionController],
  exports: [PositionService],
})
export class PositionModule {}
