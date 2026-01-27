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
