"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { browser: "heart", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "kidney", visitors: 200, fill: "var(--color-safari)" },
    { browser: "lungs", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "intestine", visitors: 173, fill: "var(--color-edge)" },
    { browser: "eye", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
    visitors: {
        label: "Organ",
    },
    chrome: {
        label: "Heart",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Kidney",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Lungs",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Intestine",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Eye",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function HlaMatchSuccessRate() {
    return (
        <Card className="border-primary flex h-full w-full flex-col bg-transparent">
            <CardHeader className="items-center pb-0">
                <CardTitle>HLA Match Success Rate</CardTitle>
                <CardDescription>January - february 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={-90}
                        endAngle={380}
                        innerRadius={30}
                        outerRadius={110}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    nameKey="browser"
                                />
                            }
                        />
                        <RadialBar dataKey="visitors" background>
                            <LabelList
                                position="insideStart"
                                dataKey="browser"
                                className="fill-white capitalize mix-blend-luminosity"
                                fontSize={11}
                            />
                        </RadialBar>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
