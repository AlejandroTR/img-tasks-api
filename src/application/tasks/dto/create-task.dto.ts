import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'image1.jpg',
    description: 'Path of the image to process',
  })
  imagePath: string;
}
