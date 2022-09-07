import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Employee } from '../employee/employee.entity';

@Entity()
export class EmployeeHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (employee) => employee.history)
  employee: Employee;

  @Column({ nullable: true })
  oldPosition?: string;

  @Column({ nullable: true })
  newPosition?: string;

  @Column({ nullable: true })
  oldSalary?: number;

  @Column({ nullable: true })
  newSalary?: number;

  @UpdateDateColumn()
  updatedAt: string;
}
