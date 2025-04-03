import * as fs from 'fs/promises';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as path from 'path';

import { processImage, ProcessedImage } from './image.utils';

jest.mock('sharp');
jest.mock('fs/promises');
jest.mock('crypto');

const normalizePath = (filePath: string) => path.normalize(filePath);

describe('processImage', () => {
  const mockImagePath = 'image1.jpg';
  const mockFullImagePath = path.join('images', mockImagePath);
  const mockProcessedImages: ProcessedImage[] = [
    {
      resolution: 1024,
      path: normalizePath(
        'output/image1/1024/08df957ef173984ba737be7cb69fbbab.jpg',
      ),
    },
    {
      resolution: 800,
      path: normalizePath(
        'output/image1/800/08df957ef173984ba737be7cb69fbbab.jpg',
      ),
    },
  ];

  beforeEach(() => {
    (fs.access as jest.Mock).mockResolvedValueOnce(undefined);
    (sharp as unknown as jest.Mock).mockReturnValue({
      resize: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValueOnce(undefined),
    });
    (crypto.createHash as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('08df957ef173984ba737be7cb69fbbab'),
    });
  });

  it('should process an image and return processed images', async () => {
    const result = await processImage(mockImagePath);

    expect(sharp).toHaveBeenCalledWith(mockFullImagePath);

    const normalizedResult = result.map((image) => ({
      ...image,
      path: normalizePath(image.path),
    }));

    expect(normalizedResult).toEqual(mockProcessedImages);
  });

  it('should throw an error if image processing fails', async () => {
    (fs.access as jest.Mock).mockRejectedValueOnce(new Error('File not found'));

    try {
      await processImage(mockImagePath);
    } catch (error) {
      expect((error as Error).message).toBe(
        'Image not found or processing failed: Error: File not found',
      );
    }
  });
});
