export interface Connector {
  name: string;
  type: string;
  tasks: Task[];
  config: Record<string, string>;
  class: string;
}

export interface Task {
  id: number;
  status: "running" | "failed" | "paused";
  worker_id: string;
}
