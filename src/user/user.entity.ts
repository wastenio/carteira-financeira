import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.sender)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.receiver)
  receivedTransactions: Transaction[];
}
