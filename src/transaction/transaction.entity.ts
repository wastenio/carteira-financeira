import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentTransactions)
  sender: User;

  @ManyToOne(() => User, user => user.receivedTransactions)
  receiver: User;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  createdAt: Date;
}
