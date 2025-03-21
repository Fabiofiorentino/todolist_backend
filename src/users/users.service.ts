import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Injeta o repositório TypeORM da entidade User
  ) { }


  //  Cria um novo usuário no banco de dados.
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Cria um novo usuário com os dados fornecidos
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return await this.usersRepository.save(user); // Salva o usuário no banco de dados
  }


  // Busca um usuário pelo ID.
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`); // Retorna erro 404 se o usuário não existir
    }
    return user;
  }


  // Busca um usuário pelo e-mail.
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } }); // Retorna o usuário se encontrado
  }
}
