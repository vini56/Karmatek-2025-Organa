"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
    {
        month: "Jan",
        available: 40,
        matched: 24,
        transplanted: 20,
    },
    {
        month: "Feb",
        available: 30,
        matched: 13,
        transplanted: 10,
    },
    {
        month: "Mar",
        available: 20,
        matched: 10,
        transplanted: 5,
    },
    {
        month: "Apr",
        available: 10,
        matched: 5,
        transplanted: 3,
    },
    {
        month: "May",
        available: 5,
        matched: 3,
        transplanted: 2,
    },
    {
        month: "Jun",
        available: 2,
        matched: 1,
        transplanted: 1,
    },
    {
        month: "Jul",
        available: 1,
        matched: 0,
        transplanted: 0,
    },
];

const chartConfig = {
    available: {
        label: "Available",
        color: "#2563eb",
    },
    matched: {
        label: "Matched",
        color: "#60a5fa",
    },
    transplanted: {
        label: "Transplanted",
        color: "#93c5fd",
    },
} satisfies ChartConfig;

const AvailableMatchedTransplantedChart = () => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                    dataKey="available"
                    fill="var(--color-available)"
                    radius={4}
                />
                <Bar dataKey="matched" fill="var(--color-matched)" radius={4} />
                <Bar
                    dataKey={"transplanted"}
                    fill="var(--color-transplanted)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
};
export default AvailableMatchedTransplantedChart;
