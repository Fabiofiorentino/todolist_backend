import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Método para ativar a proteção de rotas com JWT
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // Método para tratar a resposta do Passport, verificando se o usuário está autenticado
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Acesso negado'); // Retorna erro 401 se não houver usuário autenticado
    }
    return user;
  }
}
