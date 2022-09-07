import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeHistoryController } from './employee-history.controller';
import { EmployeeHistory } from './employee-history.entity';
import { EmployeeHistoryService } from './employee-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeHistory])],
  providers: [EmployeeHistoryService],
  controllers: [EmployeeHistoryController],
  exports: [EmployeeHistoryService],
})
export class EmployeeHistoryModule {}
