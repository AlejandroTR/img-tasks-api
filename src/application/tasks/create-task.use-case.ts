import { Injectable } from '@nestjs/common';
import { ImageService } from '../../infrastructure/services/image.service';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly imageService: ImageService) {}

  async execute(imagePath: string) {
    return this.imageService.createProcessingTask(imagePath);
  }
}
