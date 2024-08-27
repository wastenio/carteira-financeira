import { Controller, Post, Body } from '@nestjs/common';
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
}
