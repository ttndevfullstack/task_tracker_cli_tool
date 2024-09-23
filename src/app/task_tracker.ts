import { IResponse, ITask, TTaskStatus } from './schema';
import { readFile, writeFile } from './file';
import { TASKS_FILE } from './config';

export function getTasks(path: string): ITask[] {
  return readFile(path) ?? [];
}

export const addTask = (description: string): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);
  const newTask: ITask = {
    id: Math.floor(Math.random() * 10000000),
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const newTasks = [...tasks, newTask];
  writeFile(TASKS_FILE, newTasks);

  return {
    status: 201,
    success: true,
    message: 'Added tasks successfully',
    data: null,
  };
};

export const updateTask = (id: number, description: string): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);
  const updatedTasks = tasks.map((curTask) => (curTask.id === id ? { ...curTask, description } : curTask));
  writeFile(TASKS_FILE, updatedTasks);

  return {
    status: 201,
    success: true,
    message: 'Updated tasks successfully',
    data: null,
  };
};

export const deleteTask = (id: number): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);
  const updatedTasks = tasks.filter((task) => task.id !== id);
  writeFile(TASKS_FILE, updatedTasks);

  return {
    status: 201,
    success: true,
    message: 'Deleted tasks successfully',
    data: null,
  };
};

export const markTask = (id: number, status: TTaskStatus): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);
  const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status } : task));
  writeFile(TASKS_FILE, updatedTasks);

  return {
    status: 201,
    success: true,
    message: 'Marked tasks successfully',
    data: null,
  };
};

export const listTask = (filter?: TTaskStatus): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);
  if (!filter) {
    return {
      status: 201,
      success: true,
      data: tasks,
    };
  }

  return {
    status: 201,
    success: true,
    data: tasks.filter((task) => task.status === filter),
  };
};

export const showTask = (id: number): IResponse => {
  const tasks: ITask[] = getTasks(TASKS_FILE);

  return {
    status: 201,
    success: true,
    data: tasks.find((task) => task.id === id),
  };
};
