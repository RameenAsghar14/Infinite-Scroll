import { NextRequest, NextResponse } from 'next/server';
import { generateTasks } from '@/utils/generateTasks';
import { filterTasks } from '@/utils/filterTasks';
import { paginateTasks } from '@/utils/paginateTasks';
import { Task } from '@/types/task';

const parseQueryParams = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  return {
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '20', 10),
    search: searchParams.get('search') || '',
  };
};

const formatResponse = (tasks: Task[], totalCount: number, page: number, limit: number) => ({
  tasks,
  hasMore: page * limit < totalCount,
});

export async function GET(request: NextRequest) {
  const { page, limit, search } = parseQueryParams(request);

  const tasks: Task[] = generateTasks();
  const filteredTasks = filterTasks(tasks, search);
  const paginatedTasks = paginateTasks(filteredTasks, page, limit);

  return NextResponse.json(formatResponse(paginatedTasks, filteredTasks.length, page, limit));
}
