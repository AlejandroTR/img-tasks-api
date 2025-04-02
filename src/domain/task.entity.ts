export interface Task {
  taskId?: string;
  status: 'pending' | 'completed' | 'failed';
  price: number;
  images?: Array<{
    resolution: number;
    path: string;
  }>;
}
