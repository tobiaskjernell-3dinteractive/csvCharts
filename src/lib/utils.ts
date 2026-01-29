import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertRecordToObject = (data: Record<string, string | number>[]): { [x: string]: string | number }[] => {
  return Object.values(data).map((value) => ({
    ...value,
  }))
}

export const dataFilterPOI = <T extends Record<string, string | number>>(dataFix: T[]): T[] => {
  return dataFix
    .map(item => {
      const [key] = Object.keys(item) as (keyof T)[];
      console.log(key);
      if (typeof (item[key]) === 'string')
        if (!item[key].startsWith("POI_")) return null;

      return {
        ...item,
        [key]: String(item[key]).replace("POI_", "").replace(/([A-Z])/g, ' $1').trim(),
      };
    })
    .filter(Boolean) as T[];
};

export const spaceHelper = (str: string): string => str.replace(/([A-Z])/g, ' $1').trim()

export const cleanUpPOIstr = (data: Record<string, string | number>[]): Record<string, string | number>[] => {
  return data.filter(
    (item) => !String(Object.values(item)[0]).startsWith('POI') && Object.values(item)[0] !== '')
};

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
