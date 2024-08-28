import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Transaction } from './transaction/transaction.entity'; // Importe a entidade Transaction
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.cqhkeyenbhwswarzfqbf',
      password: 'NAtyDudA2020',
      database: 'postgres',
      entities: [User, Transaction],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Transaction]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
