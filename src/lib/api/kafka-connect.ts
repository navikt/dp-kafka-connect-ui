import { ApiResponse, ApiResponseSchema } from "@/schemas/kafka-connect";
import { mapToProps } from "@/lib/adapter/api-to-ui";

export async function getKafkaConnectors() {
  const data = await fetchKafkaConnectors();
  return mapToProps(data);
}

async function fetchKafkaConnectors(): Promise<ApiResponse> {
  const url = `${process.env.KAFKA_CONNECT_REST_URL}/connectors?expand=info&expand=status`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch connectors from ${url}`);
  }

  const json = await response.json();
  return ApiResponseSchema.parse(json);
}
