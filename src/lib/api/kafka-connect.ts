// /lib/api/kafkaConnect.ts
import { ApiResponse, ApiResponseSchema } from "@/schemas/kafka-connect";
import { TaskStatus } from "@/components/kafka-connect-visualizer";

// Function to fetch Kafka Connectors
export async function getKafkaConnectors() {
  const data = await fetchKafkaConnectors();
  return mapToProps(data);
}

// Fetch the data from the API
async function fetchKafkaConnectors(): Promise<ApiResponse> {
  const url = `${process.env.KAFKA_CONNECT_REST_URL}/connectors?expand=info&expand=status`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch connectors from ${url}`);
  }

  const json = await response.json();
  return ApiResponseSchema.parse(json);
}

// Map the API response to the desired component props
function mapToProps(data: ApiResponse) {
  return Object.values(data).map((connector) => ({
    name: connector.info.name,
    type: connector.info.type,
    class: connector.info.config["connector.class"],
    tasks: connector.status.tasks.map((task) => ({
      id: task.id,
      status: mapTaskStatus(task.state),
      worker_id: task.worker_id,
    })),
    config: connector.info.config,
  }));
}

function mapTaskStatus(status: string): TaskStatus {
  switch (status) {
    case "RUNNING":
      return "running";
    case "PAUSED":
      return "paused";
    default:
      return "failed";
  }
}
