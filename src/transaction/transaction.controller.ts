import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('transfer')
  async transfer(@Body() body: { senderId: number, receiverId: number, amount: number }) {
    return this.transactionService.transfer(body.senderId, body.receiverId, body.amount);
  }
}
