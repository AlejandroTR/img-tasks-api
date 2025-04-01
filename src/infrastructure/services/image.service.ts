import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TaskRepository } from '../adapters/task.repository';
import { Task } from '../../domain/task.entity';

@Injectable()
export class ImageService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createProcessingTask(imagePath: string) {
    const price = (Math.random() * (50 - 5) + 5).toFixed(2);
    const taskId = uuidv4();

    const task: Task = {
      taskId,
      status: 'pending',
      price: parseFloat(price),
    };

    await this.taskRepository.create(task);
    this.processImage(imagePath, taskId);

    return task;
  }

  processImage(imagePath: string, taskId: string) {
    console.log(`Processing image: ${imagePath} ${taskId}`);
  }
}
