import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ChartType } from "@/lib/utils";
import { useChartStore } from "@/zustand/stores";
import { ChevronRightCircle } from "lucide-react";
import { useRef, useState } from "react";

const SelectDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { chart, updateChart } = useChartStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleSetOpen = () => setIsOpen(e => !e)
    const handleUpdateChart = (newChart: ChartType) => {
        updateChart(newChart)
        setIsOpen(false);       
    }   

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className="relative w-30 cursor-pointer">
            <div onClick={handleSetOpen} className="w-30 h-auto bg-white rounded-2xl flex justify-between pl-2 border border-black rounded-l-none">
                <h2>{chart}</h2>
                <ChevronRightCircle className={`transition-all duration-150 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </div>

            {isOpen && <div className="w-[90%] absolute top-[calc(100%-1px)] left-0 border border-black bg-white  divide-y divide-gray-300 ">
                <div className="pl-2 hover:bg-sky-300" onClick={() => handleUpdateChart(ChartType.Pie)}>Pie</div>
                <div className="pl-2 hover:bg-sky-300" onClick={() => handleUpdateChart(ChartType.Bar)}>Bar</div>
            </div>}

        </div>

    )
}

export default SelectDropdown;