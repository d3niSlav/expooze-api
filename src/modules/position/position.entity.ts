import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Interview } from '../interview/interview.entity';
import { JobTitle } from '../job-title/job-title.entity';
import { Tag } from '../tag/tag.entity';

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

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable({ name: 'job_titles_tags' })
  tags?: Tag[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
