import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { cleanUpPOIstr, convertRecordToObject, dataFilterPOI } from "@/lib/utils";

export function ChartBarLabel({ data }: { data: Record<string, string>[] }) {
    const dataFix = convertRecordToObject(data);
    const visualData = dataFilterPOI(dataFix)
    const dataOverflow = cleanUpPOIstr(data);

    const chartConfig = {
        statistic: {
            label: "Statistic",
            color: "var(--chart-1)",
        },
        value: {
            label: "Value",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardContent>
                {dataOverflow.map(item =>
                    <div className="flex items-center justify-center gap-3">
                        <CardTitle>{item.Statistic}:</CardTitle>
                        <p className="text-sm">{item.Value}</p>
                    </div>
                )}
            </CardContent>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Info from CSV</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={visualData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='Statistic'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent

                                />
                            }
                            cursor={false}
                            defaultIndex={1}
                        />
                        <YAxis
                            dataKey='Value'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}

                        />
                        <Bar dataKey="Value" fill="skyblue" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                fill="black"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ChartBarLabel;