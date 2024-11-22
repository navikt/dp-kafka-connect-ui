import { ApiResponse } from "@/schemas/kafka-connect";
import { Task } from "@/schemas/ui";

export function mapToProps(data: ApiResponse) {
  return Object.values(data).map((connector) => ({
    name: connector.info.name,
    type: connector.info.type,
    class: connector.info.config["connector.class"],
    tasks: connector.status.tasks.map((task) => ({
      id: task.id,
      status: mapToTaskStatus(task.state),
      worker_id: task.worker_id,
    })),
    config: connector.info.config,
  }));
}

function mapToTaskStatus(status: string): Task["status"] {
  switch (status) {
    case "RUNNING":
      return "running";
    case "PAUSED":
      return "paused";
    default:
      return "failed";
  }
}
