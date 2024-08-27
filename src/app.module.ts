import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-1.pooler.supabase.com', // ou a URL do seu banco de dados Supabase
      port: 5432,
      username: 'postgres.cqhkeyenbhwswarzfqbf',
      password: 'NAtyDudA2023',
      database: 'carteiradigital',
      entities: [User],
      synchronize: false, // Apenas para desenvolvimento. Não use em produção.
    }),
    TypeOrmModule.forFeature([User]), // Importando o módulo do User
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
