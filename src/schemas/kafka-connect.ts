// /schemas/connectors.ts
import { z } from "zod";

// Define the TaskStatus enum for use in the schema
export const TaskStatusEnum = z.enum(["RUNNING", "PAUSED", "FAILED"]);

// Define the Zod schema for Connector
export const ConnectorSchema = z.object({
  status: z.object({
    name: z.string(),
    connector: z.object({ state: z.string(), worker_id: z.string() }),
    tasks: z.array(
      z.object({
        id: z.number(),
        state: TaskStatusEnum,
        worker_id: z.string(),
      })
    ),
    type: z.string(),
  }),
  info: z.object({
    name: z.string(),
    config: z
      .record(z.string())
      .refine((config) => "connector.class" in config, {
        message: "Missing connector.class in config",
      }),
    tasks: z.array(z.object({ connector: z.string(), task: z.number() })),
    type: z.string(),
  }),
});

// Define the schema for the API response, where each key is a connector
export const ApiResponseSchema = z.record(ConnectorSchema);

// Type inferred from the schema for use throughout the app
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
