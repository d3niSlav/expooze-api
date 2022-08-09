import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}
