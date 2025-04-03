import { Injectable } from '@nestjs/common';

import { TaskRepository } from '../adapters/task.repository';
import { Task } from '../../domain/task.entity';
import { ProcessedImage, processImage } from '../utils/image.utils';
import { ImageRepository } from '../adapters/image.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly imageRepository: ImageRepository,
  ) {}

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
    const task = await this.taskRepository.getById(taskId);

    if (!task) {
      return null;
    }

    if (task.status === 'pending' || task.status === 'failed') {
      return task;
    }

    const images = await this.imageRepository.findByTaskId(taskId);

    return { ...task, images };
  }

  private async processImageAsync(imagePath: string, taskId: string) {
    try {
      const processedImages: ProcessedImage[] = await processImage(imagePath);

      for (const img of processedImages) {
        await this.imageRepository.create({ ...img, taskId });
      }

      await this.taskRepository.update(taskId, { status: 'completed' });
    } catch (error) {
      console.error('Error occurred:', error);
      await this.taskRepository.update(taskId, { status: 'failed' });
    }
  }
}
