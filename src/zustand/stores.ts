import { ChartType } from "@/lib/utils";
import { create } from "zustand";

interface IChartStore {
    chart: ChartType,
    updateChart: (info:ChartType) => void
}

export const useChartStore = create<IChartStore>((set) => ({
    chart: ChartType.Bar,
    updateChart: (newChart:ChartType) => set({chart: newChart})
}))