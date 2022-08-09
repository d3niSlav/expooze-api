import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JobTitle {
  @PrimaryColumn()
  key: string;

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
