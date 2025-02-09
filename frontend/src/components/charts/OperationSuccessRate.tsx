"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { name: "Success Rate", value: 75, fill: "hsl(var(--chart-1))" },
];

const chartConfig = {
  value: {
    label: "Success Rate",
  },
} satisfies ChartConfig;

export function OperationSuccessRate() {
  return (
    <Card className="flex flex-col border-primary bg-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle>Operation Success Rate</CardTitle>
        <CardDescription>Current Performance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="65%"
            outerRadius="85%"
            barSize={20}
            width={250}
            height={250}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={30}
              fill="hsl(var(--chart-1))"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-3xl font-bold"
            >
              {`${chartData[0].value}%`}
            </text>
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs"
            >
              Success
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
