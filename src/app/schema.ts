export type TEnv = "test" | "dev" | "prod";

export type TTaskStatus = "todo" | "in-progress" | "done";

export type TMethod = "add" | "update" | "delete" | "mark" | "list" | "show";

export interface ITask {
  id: number;
  description: string;
  status: TTaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IResponse {
  status: number;
  success: boolean;
  message?: string;
  data: any;
}


