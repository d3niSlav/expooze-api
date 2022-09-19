import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { CandidateModule } from '../candidate/candidate.module';
import { JobTitleModule } from '../job-title/job-title.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    CandidateModule,
    JobTitleModule,
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
