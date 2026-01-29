import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cleanUpPOIstr, convertRecordToObject, dataFilterPOI, randomColorsPie, spaceHelper } from "@/lib/utils"
import SelectDropdown from "../SelectDropdown"

export const description = "A pie chart with a legend"

export function PieChartLabel({ data }: { data: Record<string, string | number>[] }) {
  const dataFix = convertRecordToObject(data);  
  const visualData = dataFilterPOI(dataFix)
  const dataOverflow = cleanUpPOIstr(data);
  const visualDataWithColor = visualData.map((item, index) => ({
    [Object.keys(data[0])[0]]: Object.values(item)[0],
    [Object.keys(data[0])[1]]: Number(Object.values(item)[1]),
    fill: randomColorsPie[index]
  }))

  if (visualDataWithColor === null) return;
  const setUpConfig = visualDataWithColor.reduce((acc, item, index) => {
    acc[Object.values(item)[0]] = {
      label: [Object.values(item)[0]],
      color: `var(--chart-${index + 1})`
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card className="flex flex-col">
      <div className="ml-8">
        <SelectDropdown />
      </div>
      <CardHeader className="items-center pb-0">
        {dataOverflow.map((item, index) => <div key={index} className="flex gap-1 justify-center">
          <CardTitle>{spaceHelper(String(Object.values(item)[0]))}:</CardTitle>
          <CardDescription>{Object.values(item)[1]}</CardDescription>
        </div>)}

      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={setUpConfig}
          className="mx-auto aspect-square max-h-150"
        >
          <PieChart>
            <Pie animationBegin={0} animationDuration={1000} data={visualDataWithColor} dataKey={Object.keys(data[0])[1]} label />
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey={Object.keys(data[0])[0]} />} />
            <ChartLegend
              content={<ChartLegendContent nameKey={Object.keys(data[0])[0]} />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
