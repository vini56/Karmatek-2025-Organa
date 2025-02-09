"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { organ: "kidneys", required: 275, fill: "var(--color-kidneys)" },
  { organ: "liver", required: 200, fill: "var(--color-liver)" },
  { organ: "heart", required: 150, fill: "var(--color-heart)" },
  { organ: "lungs", required: 100, fill: "var(--color-lungs)" },
];

const chartConfig = {
  organs: {
    label: "Organs",
  },
  kidneys: {
    label: "Kidneys",
    color: "hsl(var(--chart-1))",
  },
  liver: {
    label: "Liver",
    color: "hsl(var(--chart-2))",
  },
  heart: {
    label: "Heart",
    color: "hsl(var(--chart-3))",
  },
  lungs: {
    label: "Lungs",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function OrganDistribution() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="required" hideLabel />}
        />
        {/* <ChartLegend content={<ChartLegendContent />} /> */}
        <ChartLegend
          content={<ChartLegendContent nameKey="organ" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />

        <Pie data={chartData} dataKey="required">
          <LabelList
            dataKey="organ"
            className="fill-background font-semibold"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
