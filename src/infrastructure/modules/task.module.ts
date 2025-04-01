import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskSchema } from '../adapters/task.model';
import { TaskController } from '../controllers/task.controller';
import { TaskRepository } from '../adapters/task.repository';
import { ImageService } from '../services/image.service';
import { CreateTaskUseCase } from '../../application/tasks/create-task.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskRepository, ImageService, CreateTaskUseCase],
  exports: [TaskRepository, ImageService],
})
export class TaskModule {}
