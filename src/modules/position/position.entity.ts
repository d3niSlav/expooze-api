import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  shortTitle?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  minSalary?: number;

  @Column({ nullable: false })
  averageSalary?: number;

  @Column({ nullable: false })
  maxSalary?: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
