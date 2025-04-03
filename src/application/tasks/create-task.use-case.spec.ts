import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskUseCase } from './create-task.use-case';
import { TaskService } from '../../infrastructure/services/task.service';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
          },
        },
      ],
    }).compile();

    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  it('should be defined', () => {
    expect(createTaskUseCase).toBeDefined();
  });
});
