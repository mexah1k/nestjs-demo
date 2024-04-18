import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255})
  @Index("UX_Code", { unique: true })
  code: string;

  @Column()
  expirationDate: number;
}
