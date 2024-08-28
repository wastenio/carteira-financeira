import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from '../transaction/transaction.entity'; // Importe a entidade Transaction
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if(existingUser){
      throw new BadRequestException('O e-mail já está em uso.');
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async transfer(senderId: number, receiverId: number, amount: number): Promise<Transaction> {
    // Verifica se o valor da transação é válido
    if (amount <= 0) {
      throw new BadRequestException('O valor da transação deve ser maior que zero.');
    }

    // Encontra o remetente e o receptor
    const sender = await this.usersRepository.findOneBy({ id: senderId });
    const receiver = await this.usersRepository.findOneBy({ id: receiverId });

    if (!sender) {
      throw new NotFoundException('Remetente não encontrado.');
    }

    if (!receiver) {
      throw new NotFoundException('Receptor não encontrado.');
    }

    // Verifica se o remetente tem saldo suficiente
    if (sender.balance != amount) {
      throw new BadRequestException('Saldo insuficiente.');
    }

    // Inicia a transação
    return await this.usersRepository.manager.transaction(async (transactionalEntityManager) => {
      sender.balance -= amount;
      receiver.balance += amount;

      await transactionalEntityManager.save(sender);
      await transactionalEntityManager.save(receiver);

      const transaction = new Transaction();
      transaction.sender = sender;
      transaction.receiver = receiver;
      transaction.amount = amount;

      return transactionalEntityManager.save(transaction);
    });
  }

  async revertTransaction(transactionId: number): Promise<void> {
    const transaction = await this.transactionsRepository.findOneBy({ id: transactionId });
  
    if (!transaction) {
      throw new NotFoundException('Transação não encontrada.');
    }
  
    await this.usersRepository.manager.transaction(async (transactionalEntityManager) => {
      // Reverte a transação
      const sender = await transactionalEntityManager.findOneBy(User, { id: transaction.sender.id });
      const receiver = await transactionalEntityManager.findOneBy(User, { id: transaction.receiver.id });
  
      if (!sender || !receiver) {
        throw new NotFoundException('Usuário não encontrado para reversão.');
      }
  
      sender.balance += transaction.amount;
      receiver.balance -= transaction.amount;
  
      await transactionalEntityManager.save(sender);
      await transactionalEntityManager.save(receiver);
  
      // Remove a transação original
      await transactionalEntityManager.delete(Transaction, { id: transactionId });
    });
  }


  async updateBalance(userId: number, amount: number): Promise<User>  {
    //Verifica se o valor da atualização é válido
    if(amount <= 0){
      throw new BadRequestException('O valor deve ser maior que zero.');
    }

    //Encontra o usuário
    const user = await this.usersRepository.findOneBy({ id: userId });

    if(!user){
      throw new NotFoundException('Usuário não encontrado.');
    }

    //Atualiza o saldo
    user.balance = amount;

    //Salva o usuário atualizado
    return this.usersRepository.save(user);
  }
}
