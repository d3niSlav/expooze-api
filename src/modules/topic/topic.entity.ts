import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Question } from '../question/question.entity';
import { Subject } from '../subject/subject.entity';
import { Tag } from '../tag/tag.entity';
import { DifficultyLevel } from '../../utils/enums/difficulty-level.enum';

@Unique(['title', 'subject'])
@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.easy,
  })
  difficulty: DifficultyLevel;

  @Column('integer', { nullable: true })
  order?: number;

  @ManyToOne(() => Subject, (subject) => subject.topics)
  subject: Subject;

  @ManyToMany(() => Question, (question) => question.topics, { nullable: true })
  @JoinTable({ name: 'topics_questions' })
  questions?: Question[];

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable({ name: 'topics_tags' })
  tags?: Tag[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
