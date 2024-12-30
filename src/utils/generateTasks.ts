import { Task } from '@/types/task';

export const generateTasks = (count: number = 10000): Task[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    description: `This is the description for Task ${index + 1}`,
  }));
};
