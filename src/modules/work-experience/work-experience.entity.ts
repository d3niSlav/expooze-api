import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Candidate } from '../candidate/candidate.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.experience, {
    onDelete: 'CASCADE',
  })
  candidate: Candidate;

  @Column()
  jobTitle: string;

  @Column()
  seniorityLevel: string;

  @Column({ nullable: true })
  years?: string;

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable({ name: 'work_experience_tags' })
  skills?: Tag[];

  @Column({ type: 'simple-array', nullable: true })
  fields?: string[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
