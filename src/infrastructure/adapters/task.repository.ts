import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from '../../domain/task.entity';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(task: Task): Promise<Omit<Task, '_id'> | null> {
    const createdTask = new this.taskModel(task);
    await createdTask.save();

    return this.taskModel
      .findById(createdTask._id)
      .lean()
      .select('-_id')
      .exec();
  }

  async update(
    taskId: string,
    updateData: Pick<Task, 'status' | 'images'>,
  ): Promise<Task | null> {
    return this.taskModel
      .findOneAndUpdate(
        { taskId },
        {
          ...updateData,
          images: updateData.images ?? [],
        },
        { new: true },
      )
      .exec();
  }

  async getById(taskId: string): Promise<Task | null> {
    return this.taskModel.findOne({ taskId }).lean().select('-_id').exec();
  }
}
