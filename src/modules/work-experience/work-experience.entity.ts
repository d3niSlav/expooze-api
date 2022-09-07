import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tag } from '../tag/tag.entity';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jobTitle: string;

  @Column()
  seniorityLevel: string;

  @Column({ nullable: true })
  years?: number;

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
