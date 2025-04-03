import { Test, TestingModule } from '@nestjs/testing';

import { TaskService } from './task.service';
import { TaskRepository } from '../adapters/task.repository';
import { Task } from '../../domain/task.entity';
import { ProcessedImage, processImage } from '../utils/image.utils';
import { ImageRepository } from '../adapters/image.repository';

const taskRepositoryMock = {
  create: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
};

const imageRepositoryMock = {
  create: jest.fn(),
  findByTaskId: jest.fn(),
};

jest.mock('../utils/image.utils', () => ({
  processImage: jest.fn(),
}));

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;
  let imageRepository: ImageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: taskRepositoryMock,
        },
        {
          provide: ImageRepository,
          useValue: imageRepositoryMock,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    imageRepository = module.get<ImageRepository>(ImageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task with initial status "pending" and a random price', async () => {
      const imagePath = 'image1.jpg';

      const savedTask: Task = {
        taskId: '67ee5fbfaea2c67cd8cb4bb0',
        status: 'pending',
        price: 22.5,
      };
      taskRepositoryMock.create.mockResolvedValue(savedTask);

      const processedImages: ProcessedImage[] = [
        {
          resolution: 1024,
          path: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
        {
          resolution: 800,
          path: 'output/image1/800/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
      ];
      (processImage as jest.Mock).mockResolvedValue(processedImages);

      const result = await taskService.createTask(imagePath);

      expect(taskRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('taskId');
      expect(result?.status).toBe('pending');
      expect(result?.price).toBeDefined();
      expect(result?.images).toBeUndefined();
    });
  });

  describe('getTaskById', () => {
    it('should return task with only price and status if the task is pending', async () => {
      const taskId = '67ee5fbfaea2c67cd8cb4bb0';
      const pendingTask = {
        taskId,
        status: 'pending',
        price: 22.5,
      };

      taskRepositoryMock.getById.mockResolvedValue(pendingTask);

      const result = await taskService.getTaskById(taskId);

      expect(result).toEqual({
        taskId,
        status: 'pending',
        price: 22.5,
      });
      expect(result?.images).toBeUndefined();
    });

    it('should return task with images and price if the task is completed', async () => {
      const taskId = '67ee5fbfaea2c67cd8cb4bb0';
      const completedTask = {
        taskId,
        status: 'completed',
        price: 22.5,
      };
      const images = [
        {
          resolution: 1024,
          path: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
        {
          resolution: 800,
          path: 'output/image1/800/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
      ];

      taskRepositoryMock.getById.mockResolvedValue(completedTask);
      imageRepositoryMock.findByTaskId.mockResolvedValue(images);

      const result = await taskService.getTaskById(taskId);

      expect(result).toEqual({
        taskId,
        status: 'completed',
        price: 22.5,
        images: [
          {
            resolution: 1024,
            path: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
            md5: '08df957ef173984ba737be7cb69fbbab',
          },
          {
            resolution: 800,
            path: 'output/image1/800/08df957ef173984ba737be7cb69fbbab.jpg',
            md5: '08df957ef173984ba737be7cb69fbbab',
          },
        ],
      });
    });

    it('should return null if task not found', async () => {
      const taskId = 'non-existing-id';
      taskRepositoryMock.getById.mockResolvedValue(null);

      const result = await taskService.getTaskById(taskId);

      expect(result).toBeNull();
    });
  });

  describe('processImageAsync', () => {
    it('should update task to "completed" and add processed images', async () => {
      const taskId = '67ee5fbfaea2c67cd8cb4bb0';
      const imagePath = 'image1.jpg';
      const processedImages: ProcessedImage[] = [
        {
          resolution: 1024,
          path: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
        {
          resolution: 800,
          path: 'output/image1/800/08df957ef173984ba737be7cb69fbbab.jpg',
          md5: '08df957ef173984ba737be7cb69fbbab',
        },
      ];

      (processImage as jest.Mock).mockResolvedValue(processedImages);
      taskRepositoryMock.update.mockResolvedValue({});

      await taskService['processImageAsync'](imagePath, taskId);

      expect(taskRepositoryMock.update).toHaveBeenCalledWith(taskId, {
        status: 'completed',
      });
    });

    it('should update task to "failed" if an error occurs during image processing', async () => {
      const taskId = '67ee5fbfaea2c67cd8cb4bb0';
      const imagePath = 'image1.jpg';

      (processImage as jest.Mock).mockRejectedValue(
        new Error('Image not found or processing failed'),
      );
      taskRepositoryMock.update.mockResolvedValue({});

      await taskService['processImageAsync'](imagePath, taskId);

      expect(taskRepositoryMock.update).toHaveBeenCalledWith(taskId, {
        status: 'failed',
      });
    });
  });
});
