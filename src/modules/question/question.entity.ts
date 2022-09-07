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
import { Topic } from '../topic/topic.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => Topic, (topic) => topic.questions, { nullable: true })
  @JoinTable({ name: 'topics_questions' })
  topics?: Topic[];

  @OneToMany(() => InterviewAnswer, (ia) => ia.interview, { nullable: true })
  answers?: InterviewAnswer[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
