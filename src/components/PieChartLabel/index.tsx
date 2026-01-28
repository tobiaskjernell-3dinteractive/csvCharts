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
import { cleanUpPOIstr, convertRecordToObject, dataFilterPOI, randomColorsPie } from "@/lib/utils"
import SelectDropdown from "../SelectDropdown"

export const description = "A pie chart with a legend"

export function PieChartLabel({ data }: { data: Record<string, string>[] }) {
  const dataFix = convertRecordToObject(data);
  const visualData = dataFilterPOI(dataFix)
  const dataOverflow = cleanUpPOIstr(data);

  const visualDataWithColor = visualData.map((item, index) => ({ Statistic: item.Statistic, Value: Number(item.Value), fill: randomColorsPie[index] }))

  if (visualDataWithColor === null) return;
  const setUpConfig = visualDataWithColor.reduce((acc, item, index) => {
    acc[item.Statistic] = {
      label: [item.Statistic],
      color: `var(--chart-${index + 1})`
    }
    return acc
  }, {} as ChartConfig)

  return (    
    <Card className="flex flex-col">
      <div className="ml-8  ">
      <SelectDropdown />

      </div>
      <CardHeader className="items-center pb-0">
        {dataOverflow.map((item, index) => <div key={index} className="flex gap-1 justify-center">
          <CardTitle>{item.Statistic}:</CardTitle>
          <CardDescription>{item.Value}</CardDescription>
        </div>)}

      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer 
          config={setUpConfig}
          className="mx-auto aspect-square max-h-125"
        > 
          <PieChart>
            <Pie animationBegin={0} animationDuration={1000} data={visualDataWithColor} dataKey={'Value'} label/> 
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="Statistic"/>} />
            <ChartLegend  
              content={<ChartLegendContent nameKey="Statistic" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
