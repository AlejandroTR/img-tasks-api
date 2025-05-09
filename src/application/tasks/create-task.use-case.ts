import { Injectable } from '@nestjs/common';
import { TaskService } from '../../infrastructure/services/task.service';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(imagePath: string) {
    return this.taskService.createTask(imagePath);
  }
}
