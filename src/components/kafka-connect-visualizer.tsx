"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  ChevronDown,
  Play,
  Pause,
  RotateCw,
} from "lucide-react";

export interface Props {
  connectors: Connector[];
}

export interface Connector {
  name: string;
  type: string;
  tasks: Task[];
  config: Config;
  class: string;
}

export type TaskStatus = "running" | "failed" | "paused";

export interface Task {
  id: number;
  status: TaskStatus;
  worker_id: string;
}

type Config = Record<string, string>;

function getStatusIcon(status: string) {
  switch (status) {
    case "running":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "failed":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "paused":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    default:
      return null;
  }
}
export function KafkaConnectVisualizerComponent({ connectors }: Props) {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-2">Kafka Connect</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Kafka Connect Instance Overview
      </p>
      <div className="space-y-6">
        {connectors.map((connector, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex flex-col flex-grow space-y-2 mb-4 md:mb-0">
                  <h2 className="text-2xl font-semibold">{connector.name}</h2>
                  <Badge
                    variant={
                      connector.type === "source" ? "default" : "secondary"
                    }
                    className="w-fit text-sm"
                  >
                    {connector.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Connector operations</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="grid gap-2">
                        <Button size="sm" className="w-full justify-start">
                          <Play className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                        <Button size="sm" className="w-full justify-start">
                          <Pause className="mr-2 h-4 w-4" />
                          Stop
                        </Button>
                        <Button size="sm" className="w-full justify-start">
                          <RotateCw className="mr-2 h-4 w-4" />
                          Restart
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                {connector.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <span className="text-sm font-medium">
                      Task {task.id} - {task.worker_id}
                    </span>
                    {getStatusIcon(task.status)}
                  </div>
                ))}
              </div>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Configuration
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-3 text-lg">Configuration</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {Object.entries(connector.config).map(([key, value]) => (
                        <div key={key} className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-muted-foreground text-wrap">
                            {key}
                          </span>
                          <span className="text-sm break-words">
                            {value as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
