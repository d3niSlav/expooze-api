import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CandidateDto } from '../candidate/candidate.dto';
import { Candidate } from '../candidate/candidate.entity';
import { JobTitle } from '../job-title/job-title.entity';
import { JobTitleDto } from '../job-title/job-title.dto';
import { EmployeeHistory } from '../employee-history/employee-history.entity';
import { EmployeeHistoryDto } from '../employee-history/employee-history.dto';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate)
  candidate: CandidateDto;

  @ManyToOne(() => JobTitle)
  position: JobTitleDto;

  @OneToMany(() => EmployeeHistory, (eh) => eh.employee, {
    nullable: true,
  })
  history?: EmployeeHistoryDto[];

  @Column()
  salary: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
