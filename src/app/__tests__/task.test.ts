import * as fs from 'fs';
import path from 'path';
import { addTask, deleteTask, getTasks, listTask, markTask, showTask, updateTask } from '../task_tracker';
import { TASKS_FILE } from '../config';

beforeEach(() => {
  const dir = path.dirname(TASKS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
});

afterEach(() => {
  if (fs.existsSync(TASKS_FILE)) {
    fs.unlinkSync(TASKS_FILE);
  }
});

test('should add new task', () => {
  addTask('Swimming...');
  const tasks = getTasks(TASKS_FILE);
  expect(tasks).toHaveLength(1);
  expect(tasks[0].description).toEqual('Swimming...');
  expect(tasks[0].status).toEqual('todo');
});

test('should update new task', () => {
  addTask('Swimming...');
  const task = getTasks(TASKS_FILE)[0];
  updateTask(task.id, 'Football...');
  const tasks = getTasks(TASKS_FILE);
  expect(tasks).toHaveLength(1);
  expect(tasks[0].description).toEqual('Football...');
  expect(tasks[0].status).toEqual('todo');
});

test('should delete task', () => {
  addTask('Swimming...');
  const task = getTasks(TASKS_FILE)[0];
  deleteTask(task.id);
  expect(getTasks(TASKS_FILE)).toHaveLength(0);
});

test('should mark task', () => {
  addTask('Swimming...');
  const task = getTasks(TASKS_FILE)[0];
  expect(task.status).toEqual('todo');
  markTask(task.id, 'in-progress');
  expect(getTasks(TASKS_FILE)[0].status).toEqual('in-progress');
});

test('should list all task', () => {
  addTask('Swimming...');
  addTask('Walking...');
  addTask('Finding...');
  expect(listTask()?.data).toHaveLength(3);
});

test('should list all in-progress task status', () => {
  addTask('Swimming...');
  addTask('Walking...');
  addTask('Finding...');
  const tasks = getTasks(TASKS_FILE);
  markTask(tasks[1].id, 'in-progress');
  expect(listTask('in-progress').data).toHaveLength(1);
});

test('should list all in-progress task status', () => {
  addTask('Swimming...');
  addTask('Walking...');
  addTask('Finding...');
  const tasks = getTasks(TASKS_FILE);
  markTask(tasks[0].id, 'done');
  markTask(tasks[1].id, 'done');
  expect(listTask('done').data).toHaveLength(2);
});

test('should show task', () => {
  addTask('Swimming...');
  addTask('Walking...');
  addTask('Finding...');
  const tasks = getTasks(TASKS_FILE);
  const id = tasks[2].id;
  const task = showTask(id);
  expect(task?.data?.id).toEqual(id);
});
