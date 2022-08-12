import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
