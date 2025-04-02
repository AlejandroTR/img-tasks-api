import { Injectable } from '@nestjs/common';
import { TaskService } from '../../infrastructure/services/task.service';

@Injectable()
export class GetTaskUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(taskId: string) {
    return this.taskService.getTaskById(taskId);
  }
}
