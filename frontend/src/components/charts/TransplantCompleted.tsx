// TransplantCompleted
"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "hsl(var(--chart-1))",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "hsl(var(--chart-2))",
//     },
// } satisfies ChartConfig
const chartData = [
    { month: "January", kidney: 120, liver: 80, heart: 40, lungs: 30 },
    { month: "February", kidney: 150, liver: 90, heart: 50, lungs: 35 },
    { month: "March", kidney: 170, liver: 95, heart: 55, lungs: 40 },
    { month: "April", kidney: 160, liver: 100, heart: 60, lungs: 42 },
    { month: "May", kidney: 180, liver: 110, heart: 70, lungs: 45 },
    { month: "June", kidney: 190, liver: 115, heart: 75, lungs: 50 },
];

const chartConfig = {
    kidney: { label: "Kidney", color: "hsl(var(--chart-1))" },
    liver: { label: "Liver", color: "hsl(var(--chart-2))" },
    heart: { label: "Heart", color: "hsl(var(--chart-3))" },
    lungs: { label: "Lungs", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export function TransplantCompleted() {
    return (
        <Card className="border-primary h-full w-full bg-transparent">
            <CardHeader>
                <CardTitle>Transplant Completed</CardTitle>
                <CardDescription>January - February 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="kidney"
                            type="monotone"
                            stroke="var(--color-kidney)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="liver"
                            type="monotone"
                            stroke="var(--color-liver)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="heart"
                            type="monotone"
                            stroke="var(--color-heart)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="lungs"
                            type="monotone"
                            stroke="var(--color-lungs)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
