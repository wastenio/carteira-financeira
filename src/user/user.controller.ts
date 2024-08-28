import { Controller, Post, Body, BadRequestException, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  async register(@Body() body: { email: string; password: string }) {
    return this.userService.create(body.email, body.password);
  }

  @Post('transfer')
  @ApiResponse({ status: 201, description: 'Transação realizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na transação.' })
  async transfer(@Body() body: { senderId: number; receiverId: number; amount: number }) {
    try {
      return await this.userService.transfer(body.senderId, body.receiverId, body.amount);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('update-balance/:id')
  @ApiResponse({ status: 200, description: 'Saldo atualizado com sucesso.' })
  async updateBalance(@Param('id') id: number, @Body() body: { amount: number }) {
    return this.userService.updateBalance(id, body.amount);
  }
}
