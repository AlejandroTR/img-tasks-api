import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs/promises';

const OUTPUT_DIR = 'output';
const resolutions = [1024, 800];
const IMAGE_DIRECTORY = 'images/';

export interface ProcessedImage {
  resolution: number;
  path: string;
  md5: string;
}

export const processImage = async (
  imagePath: string,
): Promise<ProcessedImage[]> => {
  const fullImagePath = path.join(IMAGE_DIRECTORY, imagePath);

  try {
    await fs.access(fullImagePath);

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const hash = await generateHash(fullImagePath);
    const originalName = path.basename(imagePath, path.extname(imagePath));
    const ext = path.extname(imagePath);

    const processedImages: ProcessedImage[] = [];

    for (const resolution of resolutions) {
      const outputPath = path.join(
        OUTPUT_DIR,
        originalName,
        resolution.toString(),
        `${hash}${ext}`,
      );

      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      await sharp(fullImagePath)
        .resize({ width: resolution })
        .toFile(outputPath);

      processedImages.push({ path: outputPath, resolution, md5: hash });
    }

    return processedImages;
  } catch (error) {
    throw new Error(`Image not found or processing failed: ${error}`);
  }
};

const generateHash = async (imagePath: string): Promise<string> => {
  const fileBuffer = await fs.readFile(imagePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
};
