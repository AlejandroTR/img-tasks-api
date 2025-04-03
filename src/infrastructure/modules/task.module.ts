import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskSchema } from '../adapters/task.model';
import { ImageSchema } from '../adapters/image.model';
import { TaskController } from '../controllers/task.controller';
import { TaskRepository } from '../adapters/task.repository';
import { ImageRepository } from '../adapters/image.repository';
import { TaskService } from '../services/task.service';
import { CreateTaskUseCase } from '../../application/tasks/create-task.use-case';
import { GetTaskUseCase } from '../../application/tasks/get-task.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    ImageRepository,
    TaskService,
    CreateTaskUseCase,
    GetTaskUseCase,
  ],
  exports: [TaskRepository, ImageRepository, TaskService],
})
export class TaskModule {}
