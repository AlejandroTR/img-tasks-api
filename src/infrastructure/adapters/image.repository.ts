import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../../domain/task.entity';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  async create(image: Image): Promise<Image> {
    return this.imageModel.create(image);
  }

  async findByTaskId(taskId: string): Promise<Image[]> {
    return this.imageModel.find({ taskId }).exec();
  }
}
