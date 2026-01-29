import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { cleanUpPOIstr, convertRecordToObject, dataFilterPOI, spaceHelper } from "@/lib/utils";
import SelectDropdown from "../SelectDropdown";

export function BarChartLabel({ data }: { data: Record<string, string | number>[] }) {
    const dataFix = convertRecordToObject(data);
    const visualData = dataFilterPOI(dataFix)
    const dataOverflow = cleanUpPOIstr(data);

    const chartConfig = {
        [(Object.keys(visualData[0])[0])]: {
            label: Object.keys(visualData)[0],
            color: "var(--chart-1)",
        },
        [(Object.keys(visualData[0])[1])]: {
            label: Object.keys(visualData)[1],
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    console.log(dataFix)
    console.log(visualData)

    return (
        <Card className="min-h-[200px] w-full">
            <CardContent>
                <SelectDropdown />
                {dataOverflow.map((item, index) =>
                    <div key={index} className="flex items-center justify-center gap-3">
                        <CardTitle>{spaceHelper(String(Object.values(item)[0]))}:</CardTitle>
                        <p className="text-sm">{Object.values(item)[1]}</p>
                    </div>
                )}
            </CardContent>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Info from CSV</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={visualData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            label={{
                                value: (Object.keys(visualData[0])[0]),
                                position: 'insideBottom',
                                offset: '5',
                                fontWeight: 'bold'
                            }}
                            dataKey={(Object.keys(visualData[0])[0])}
                            tickLine={true}
                            tickMargin={0}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 20)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey={String(Object.values(visualData[0])[0])}
                                />
                            }
                            cursor={false}

                        />
                        <YAxis
                            label={{
                                value: (Object.keys(visualData[0])[1]),
                                position: 'top',
                                offset: '10',   
                                fontWeight: 'bold'
                            }}
                            domain={[0, (overFlow: number) => Math.ceil(overFlow * 1.05)]}
                            dataKey={(Object.keys(visualData[0])[1])}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={true}

                        />
                        <Bar dataKey={(Object.keys(visualData[0])[1])} fill="skyblue" radius={8}>
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

export default BarChartLabel;