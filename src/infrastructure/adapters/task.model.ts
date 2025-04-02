import { Schema } from 'mongoose';
import { Task } from '../../domain/task.entity';

export const TaskSchema = new Schema<Task>({
  taskId: { type: String, unique: true },
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

TaskSchema.pre('save', function (next) {
  if (this.isNew) {
    this.taskId = this._id.toHexString();
  }
  next();
});

TaskSchema.index({ taskId: 1 }, { unique: true });
