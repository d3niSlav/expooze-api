import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobTitleController } from './job-title.controller';
import { JobTitle } from './job-title.entity';
import { JobTitleService } from './job-title.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobTitle])],
  providers: [JobTitleService],
  exports: [JobTitleService],
  controllers: [JobTitleController],
})
export class JobTitleModule {}
