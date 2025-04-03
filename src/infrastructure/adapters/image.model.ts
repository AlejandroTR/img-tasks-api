import { Schema } from 'mongoose';
import { Image } from '../../domain/task.entity';

export const ImageSchema = new Schema<Image>(
  {
    taskId: { type: String, required: true, index: true },
    path: { type: String, required: true },
    resolution: { type: Number, required: true },
    md5: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

ImageSchema.index({ taskId: 1 });
