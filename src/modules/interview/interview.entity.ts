import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { InterviewAnswer } from '../interview-answer/interview-answer.entity';
import { Position } from '../position/position.entity';
import { ProgrammingLanguage } from '../programmingLanguage/programming-language.entity';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Position, (position) => position.interviews)
  position: Position;

  @ManyToOne(() => ProgrammingLanguage, (pl) => pl.interviews)
  programmingLanguage: ProgrammingLanguage;

  @OneToMany(() => InterviewAnswer, (ia) => ia.interview, { nullable: true })
  answers?: InterviewAnswer[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
