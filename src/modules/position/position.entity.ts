import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Interview } from '../interview/interview.entity';
import { JobTitle } from '../job-title/job-title.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Interview, (interview) => interview.position, {
    nullable: true,
  })
  interviews?: Interview[];

  @ManyToOne(() => JobTitle, (jobTitle) => jobTitle.positions)
  jobTitle: JobTitle;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
