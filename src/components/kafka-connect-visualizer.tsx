"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  Play,
  Pause,
  RotateCw,
} from "lucide-react";
import { Connector } from "@/schemas/ui";

export type Props = {
  connectors: Connector[];
};

export function KafkaConnectVisualizerComponent({ connectors }: Props) {
  const getStatusIcon = (status: string) => {
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
  };

  const getConnectorProgress = (connector: (typeof connectors)[0]) => {
    const totalTasks = connector.tasks.length;
    const runningTasks = connector.tasks.filter(
      (task) => task.status === "running"
    ).length;
    return (runningTasks / totalTasks) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Kafka Connect</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Kafka Connect Instance Overview
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Connector Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connectors.map((connector, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{connector.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    connector.type === "source" ? "default" : "secondary"
                  }
                >
                  {connector.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {connector.tasks.map((task) => (
                    <span
                      key={task.id}
                      title={`Task ${task.id}: ${task.status}`}
                    >
                      {getStatusIcon(task.status)}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Progress
                  value={getConnectorProgress(connector)}
                  className="w-[100px]"
                />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="mr-2 h-4 w-4" />
                      <span>Start</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pause className="mr-2 h-4 w-4" />
                      <span>Stop</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCw className="mr-2 h-4 w-4" />
                      <span>Restart</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 space-y-4">
        {connectors.map((connector, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="flex items-center text-sm font-medium hover:text-primary transition-colors">
              <ChevronDown className="h-4 w-4 mr-1" />
              {connector.name} Configuration
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(connector.config).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{key}</TableCell>
                      <TableCell>{value as string}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
