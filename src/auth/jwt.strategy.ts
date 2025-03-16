import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token JWT do cabeçalho Authorization (Bearer Token)
      ignoreExpiration: false, // O token será invalidado se estiver expirado
      secretOrKey: process.env.JWT_SECRET || "6782cafa1d988303ff43c382e3bcfb76fba21e087cf100559f1c15b3d69f0a5c34f69c039b2f510c026c51fc228501b9e239260edc29b5e92777c3ac602473de",
      signOptions: { expiresIn: '1h' }, // Define a expiração do token para 1 hora
    });
  }

  // Método chamado automaticamente pelo Passport para validar o usuário com base no token JWT
  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.id); // Busca o usuário no banco pelo ID contido no token
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado'); // Se o usuário não existir, lança erro 401
    }
    return user; // Retorna o usuário autenticado, que será anexado ao objeto `request` na requisição
  }
}
