import { Test, TestingModule } from '@nestjs/testing';

import { GetTaskUseCase } from './get-task.use-case';
import { TaskService } from '../../infrastructure/services/task.service';

describe('GetTaskUseCase', () => {
  let getTaskUseCase: GetTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTaskUseCase,
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
          },
        },
      ],
    }).compile();

    getTaskUseCase = module.get<GetTaskUseCase>(GetTaskUseCase);
  });

  it('should be defined', () => {
    expect(getTaskUseCase).toBeDefined();
  });
});
