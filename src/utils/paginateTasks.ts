import { Task } from '@/types/task';

export const paginateTasks = (tasks: Task[], page: number, limit: number): Task[] => {
  const startIndex = (page - 1) * limit;
  return tasks.slice(startIndex, startIndex + limit);
};
