import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../user/user.entity';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private entityManager: EntityManager,
  ) {}

  async transfer(senderId: number, receiverId: number, amount: number): Promise<void> {
    await this.entityManager.transaction(async manager => {
    const sender = await manager.findOne(User, { where: { id: senderId } });
    const receiver = await manager.findOne(User, { where: { id: receiverId } });

    if (!sender || !receiver) {
        throw new Error('User not found');
    }

    if (sender.balance < amount) {
        throw new Error('Insufficient balance');
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await manager.save(sender);
      await manager.save(receiver);

      const transaction = this.transactionsRepository.create({
        sender,
        receiver,
        amount,
        createdAt: new Date(),
      });

      await manager.save(transaction);
    });
  }
}
