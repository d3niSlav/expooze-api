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

import { Interview } from '../interview/interview.entity';
import { Position } from '../position/position.entity';
import { WorkExperience } from '../work-experience/work-experience.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: 'pending' })
  status?: string;

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
  linedIn?: string;

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  instagram?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  whatsApp?: string;

  @Column({ nullable: true })
  vKontakte?: string;

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

  @OneToMany(() => WorkExperience, (we) => we.candidate, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  experience?: WorkExperience[];

  @OneToMany(() => Interview, (interview) => interview.candidates, {
    nullable: true,
  })
  interviews?: Interview[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
