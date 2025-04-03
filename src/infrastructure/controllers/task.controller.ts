import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/tasks/create-task.use-case';
import { GetTaskUseCase } from '../../application/tasks/get-task.use-case';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from '../../domain/task.entity';
import { CreateTaskDto } from '../../application/tasks/dto/create-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
  ) {}

  @ApiOperation({
    summary: 'Create a task',
    description: 'Used to create a task and image processing',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    type: Task,
    description: 'The task has been successfully created and save.',
  })
  @Post()
  async createTask(@Body('imagePath') imagePath: string) {
    return this.createTaskUseCase.execute(imagePath);
  }

  @ApiOperation({
    summary: 'Get Task by ID',
    description: 'Used to get a task by ID',
  })
  @ApiParam({ name: 'taskId', description: 'ID of the task' })
  @ApiOkResponse({ type: Task, description: 'Task Data' })
  @Get(':taskId')
  async getUrl(@Param('taskId') taskId: string) {
    return this.getTaskUseCase.execute(taskId);
  }
}
