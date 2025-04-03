import { Task } from './src/domain/task.entity';

const API_URL = 'http://localhost:3000/tasks';

async function createTask(imagePath: string): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imagePath }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as Task;
    console.log(`Task created: ${imagePath}`);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error creating task:', imagePath, error);
  }
}

async function createDefaultTasks(): Promise<void> {
  const imagePaths: string[] = ['image1.jpg', 'image2.jpg'];

  for (const imagePath of imagePaths) {
    await createTask(imagePath);
  }
}

void createDefaultTasks();
