import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuário registrado com sucesso',
      user,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK) // Retorna 200, pois autenticação bem-sucedida não cria recurso novo
  async login(@Body() loginDto: LoginDto) {

    const token = await this.authService.login(loginDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login realizado com sucesso',
      token,
    };
  }

  @Post("/refresh")
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

}
