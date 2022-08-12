import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Position } from '../position/position.entity';

@Entity()
export class JobTitle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  shortTitle?: string;

  @Column({ nullable: false })
  minSalary?: number;

  @Column({ nullable: false })
  averageSalary?: number;

  @Column({ nullable: false })
  maxSalary?: number;

  @OneToMany(() => Position, (position) => position.jobTitle, { nullable: true })
  positions?: Position[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
