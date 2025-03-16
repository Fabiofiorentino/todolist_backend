import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Serviço para manipular usuários
    private readonly jwtService: JwtService, // Serviço para manipular tokens JWT
  ) {}

  // Método para registrar um novo usuário
  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new BadRequestException('E-mail já está em uso'); // Se o e-mail já existe, lança erro 400
    }

    // Gera um salt e faz o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    // Cria e salva o usuário no banco de dados
    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
    });

    return { message: 'Usuário registrado com sucesso', user };
  }

  // Método para fazer login e gerar um token JWT
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email); // Busca o usuário pelo e-mail
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas'); // Se o usuário não existe ou a senha está errada, lança erro 401
    }

    // Cria um payload com os dados do usuário para gerar o token
    const payload = { id: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) }; // Retorna o token JWT para o cliente
  }
}
