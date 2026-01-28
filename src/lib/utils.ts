import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertRecordToObject = (data: Record<string, string>[]): { [x: string]: string }[] => {
  return Object.values(data).map((value) => ({
    ...value
  }))
}

export const dataFilterPOI = (dataFix: { [x: string]: string; }[]): { [x: string]: string; }[] =>
  dataFix.filter(item => item.Statistic.startsWith("POI"))
    .map(item => ({
      ...item,
      Statistic: item.Statistic.replace("POI_", ""),
    }))

export const cleanUpPOIstr = (data: Record<string, string>[]): Record<string, string>[] => { return data.filter(item => !item.Statistic.startsWith('POI')) };
export const randomColorsPie = [
  "#3f2a9b", "#ff6d3c", "#12e4f9", "#a1c23b",
  "#e34f8d", "#08b2d4", "#f7a12c", "#9c6ff5",
  "#22d87a", "#bb3e4f", "#0e4fcf", "#d1b84f",
  "#5f2e9c", "#fa5731", "#3ae9b2", "#c942f0",
  "#1d6f84", "#eac12f", "#8f3cbb", "#47f28d"
]

export enum ChartType {
    Pie = 'Pie',
    Bar = 'Bar'
}
