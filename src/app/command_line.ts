import { TMethod, TTaskStatus } from './schema';
import { addTask, deleteTask, listTask, markTask, showTask, updateTask } from './task_tracker';

const [_, __, command, ...args] = process.argv;

const method: TMethod | null = command !== '' ? (command as TMethod) : null;

switch (method) {
  case 'add':
    console.log(addTask(args[0]));
    break;
  case 'update':
    console.log(updateTask(+args[0], args[1]));
    break;
  case 'delete':
    console.log(deleteTask(+args[0]));
    break;
  case 'mark':
    const status = args[1] as TTaskStatus;
    console.log(markTask(+args[0], status));
    break;
  case 'list':
    const filter = (args[0] as TTaskStatus) ?? null;
    console.log(listTask(filter));
    break;
  case 'show':
    console.log(showTask(+args[0]));
    break;
  default:
    console.log('Invalid command');
    break;
}
