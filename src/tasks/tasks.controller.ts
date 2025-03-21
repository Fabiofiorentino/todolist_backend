import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, HttpCode,
  Res,
  Query
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const task = await this.tasksService.create(createTaskDto, req.user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tarefa criada com sucesso',
      data: task,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req, @Query('status') status?: string) {
    const tasks = await this.tasksService.findAll(req.user, status);
    return {
      statusCode: HttpStatus.OK,
      message: 'Lista de tarefas obtida com sucesso',
      data: tasks,
    };
  }



  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number, @Request() req) {
    const task = await this.tasksService.findOne(id, req.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Tarefa encontrada',
      task,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto, req.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Tarefa atualizada com sucesso',
      updatedTask,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Request() req, @Res() res) {
    await this.tasksService.remove(id, req.user);
    return res.status(HttpStatus.OK).json({ message: 'Tarefa removida com sucesso' });
  }
}
