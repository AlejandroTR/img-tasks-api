import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/tasks/create-task.use-case';
import { GetTaskUseCase } from '../../application/tasks/get-task.use-case';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
  ) {}

  @Post()
  async createTask(@Body('imagePath') imagePath: string) {
    return this.createTaskUseCase.execute(imagePath);
  }

  @Get(':taskId')
  async getUrl(@Param('taskId') taskId: string) {
    return this.getTaskUseCase.execute(taskId);
  }
}
