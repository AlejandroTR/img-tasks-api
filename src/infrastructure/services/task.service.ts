import { Injectable } from '@nestjs/common';

import { TaskRepository } from '../adapters/task.repository';
import { Task } from '../../domain/task.entity';
import { ProcessedImage, processImage } from '../utils/image.utils';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(imagePath: string) {
    const price = (Math.random() * (50 - 5) + 5).toFixed(2);

    const task: Task = {
      status: 'pending',
      price: parseFloat(price),
    };

    const savedTask = await this.taskRepository.create(task);

    if (savedTask && savedTask.taskId) {
      void this.processImageAsync(imagePath, savedTask.taskId);
    }

    return savedTask;
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    return this.taskRepository.getById(taskId);
  }

  private async processImageAsync(imagePath: string, taskId: string) {
    try {
      const processedImages: ProcessedImage[] = await processImage(imagePath);
      await this.taskRepository.update(taskId, {
        status: 'completed',
        images: processedImages,
      });
    } catch (error) {
      console.error('Error occurred:', error);
      await this.taskRepository.update(taskId, { status: 'failed' });
    }
  }
}
