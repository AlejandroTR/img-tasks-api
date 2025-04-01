import { Schema } from 'mongoose';
import { Task } from '../../domain/task.entity';

export const TaskSchema = new Schema<Task>({
  taskId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  price: { type: Number, required: true },
  images: [
    {
      resolution: { type: Number },
      path: { type: String },
    },
  ],
});
