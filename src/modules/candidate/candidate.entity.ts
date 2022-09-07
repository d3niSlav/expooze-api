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

import { Position } from '../position/position.entity';
import { WorkExperience } from '../work-experience/work-experience.entity';
import { Interview } from '../interview/interview.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  introduction?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  currentCountry?: string;

  @Column({ nullable: true })
  currentCity?: string;

  @Column({ nullable: true })
  currentAddress?: string;

  @Column({ nullable: true })
  permanentCountry?: string;

  @Column({ nullable: true })
  permanentCity?: string;

  @Column({ nullable: true })
  permanentAddress?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  desiredSalary?: number;

  @Column({ nullable: true })
  desiredLocation?: string;

  @Column({ nullable: true, default: false })
  relocate?: boolean;

  @Column({ nullable: true })
  workModel?: string;

  @ManyToMany(() => Position, { nullable: true })
  @JoinTable({ name: 'candidate_position' })
  positions?: Position[];

  @ManyToMany(() => WorkExperience, { nullable: true })
  @JoinTable({ name: 'candidate_experience' })
  experience?: WorkExperience[];

  @OneToMany(() => Interview, (interview) => interview.candidate, {
    nullable: true,
  })
  interviews?: Interview[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
