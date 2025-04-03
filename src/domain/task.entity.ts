import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: '67ed7df4fb09357cc9a2c31b' })
  taskId?: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'completed', 'failed'] })
  status: 'pending' | 'completed' | 'failed';

  @ApiProperty({ example: 19.99 })
  price: number;

  @ApiProperty({
    example: [
      {
        resolution: 1024,
        path: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
      },
    ],
    type: () => [Image],
  })
  images?: Image[];
}

export class Image {
  @ApiProperty({ example: '67ed7df4fb09357cc9a2c31b' })
  taskId: string;

  @ApiProperty({
    example: 'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
  })
  path: string;

  @ApiProperty({ example: 1024 })
  resolution: number;

  @ApiProperty({
    example: '08df957ef173984ba737be7cb69fbbab',
  })
  md5: string;
}
