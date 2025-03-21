import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>, // Injeta o repositório TypeORM da entidade Task
  ) {}


  //  Cria uma nova tarefa e a associa ao usuário autenticado.
  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, user }); // Cria a tarefa e associa ao usuário
    return this.tasksRepository.save(task); // Salva a tarefa no banco de dados
  }


  //  Retorna todas as tarefas do usuário autenticado.
  async findAll(user: User, status?: string): Promise<Task[]> {
    const whereCondition: any = { user: { id: user.id } };
  
    // Se o status foi passado e é "true" ou "false", converte para booleano e aplica o filtro
    if (status !== undefined) {
      whereCondition.status = status === 'true';
    }
  
    return this.tasksRepository.find({ where: whereCondition });
  }
  

  
  //  Busca uma tarefa específica do usuário autenticado.
  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user: { id: user.id } } });
    if (!task) throw new NotFoundException('Tarefa não encontrada'); // Retorna erro 404 se a tarefa não existir
    return task;
  }

  
  // Atualiza os dados de uma tarefa do usuário autenticado.
  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    console.log('updateTaskDto', updateTaskDto);
    
    await this.findOne(id, user); // Verifica se a tarefa existe antes de atualizar
    await this.tasksRepository.update(id, updateTaskDto); // Atualiza os dados da tarefa no banco
    return this.findOne(id, user); // Retorna a tarefa atualizada
  }

  // remove uma tarefa do usuário autenticado.
  async remove(id: number, user: User): Promise<any> {
    const task = await this.findOne(id, user); // Verifica se a tarefa existe antes de remover
    await this.tasksRepository.remove(task); // Remove a tarefa do banco de dados
  }
}
