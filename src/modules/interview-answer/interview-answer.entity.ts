import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Interview } from '../interview/interview.entity';
import { Question } from '../question/question.entity';
import { Subject } from '../subject/subject.entity';
import { Topic } from '../topic/topic.entity';

@Entity()
export class InterviewAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Interview, (interview) => interview.answers)
  interview: Interview;

  @ManyToOne(() => Subject, (subject) => subject.answers, { nullable: true })
  subject?: Subject;

  @ManyToOne(() => Topic, (topic) => topic.answers, { nullable: true })
  topic?: Topic;

  @ManyToOne(() => Question, (question) => question.answers, { nullable: true })
  question?: Question;

  @Column()
  status: string;

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
