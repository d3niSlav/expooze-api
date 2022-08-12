import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { InterviewAnswer } from '../interview-answer/interview-answer.entity';
import { Tag } from '../tag/tag.entity';
import { Topic } from '../topic/topic.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('integer', { nullable: true })
  order?: number;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable({ name: 'subjects_tags' })
  tags?: Tag[];

  @OneToMany(() => InterviewAnswer, (ia) => ia.interview, { nullable: true })
  answers?: InterviewAnswer[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
