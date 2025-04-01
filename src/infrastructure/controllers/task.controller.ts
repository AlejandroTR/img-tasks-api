import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/tasks/create-task.use-case';

@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async createTask(@Body('imagePath') imagePath: string) {
    return this.createTaskUseCase.execute(imagePath);
  }
}
