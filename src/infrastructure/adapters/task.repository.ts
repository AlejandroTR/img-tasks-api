import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from '../../domain/task.entity';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }
}
