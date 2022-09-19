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

import { Candidate } from '../candidate/candidate.entity';
import { InterviewAnswer } from '../interview-answer/interview-answer.entity';
import { Position } from '../position/position.entity';
import { ProgrammingLanguage } from '../programmingLanguage/programming-language.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  interviewDate?: string;

  @ManyToMany(() => Candidate, (candidate) => candidate.interviews, {
    nullable: true,
  })
  @JoinTable({ name: 'candidate_interview' })
  candidates?: Candidate[];

  @ManyToOne(() => Position, (position) => position.interviews)
  position: Position;

  @ManyToOne(() => ProgrammingLanguage, (pl) => pl.interviews)
  programmingLanguage: ProgrammingLanguage;

  @OneToMany(() => InterviewAnswer, (ia) => ia.interview, { nullable: true })
  answers?: InterviewAnswer[];

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable({ name: 'interview_tags' })
  tags?: Tag[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
