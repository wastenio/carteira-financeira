import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  receiver: User;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
