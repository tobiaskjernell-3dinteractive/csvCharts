import { FilePlus } from "lucide-react";
import React, { useState } from "react";
import { PieChartLabel } from "../PieChartLabel";
import BarChartLabel from "../BarChartLabel";
import { ChartType } from "@/lib/utils";
import { useChartStore } from "@/zustand/stores";

function FileUploader() {
    const currentChart = useChartStore((state) => state.chart);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = () => setIsDragging(true);          
    const handleDragLeave = () => setIsDragging(false);

    const [csvArray, setCsvArray] = useState<Record<string, string>[]>([]);

    const processCSV = (str: string, delim: string = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).trim().split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).trim().split('\n');

        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce<Record<string, string>>((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles: File[] = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
        submit(droppedFiles[0])
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const submit = (file: File) => {
        // const file = files[0]
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target?.result;
            processCSV(text as string)
        }

        reader.readAsText(file);
    }

    return (
        <>
            {files.length === 0 &&
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}

                    style={{
                        border: "2px dashed #cea86f",
                        padding: "50px",
                        textAlign: "center",
                        borderRadius: "10px",
                        backgroundColor: isDragging ? "#cea86f" : "",
                    }}
                >
                    <div className="flex gap-5 pointer-events-none">
                        <p className={`pointer-events-none text-[#cea86f] ${isDragging ? 'text-black' : 'text-[#cea86f]'}`}>Drag and drop CSV file here</p>
                        <FilePlus className="pointer-events-none" color="#cea86f" />
                    </div>
                </div>
            }
            {csvArray.length > 0 && <div className="flex">
                <div className="w-200 h-auto shadow-2xl shadow-black">
                    {currentChart === ChartType.Pie && <PieChartLabel data={csvArray} />}
                    {currentChart === ChartType.Bar && <BarChartLabel data={csvArray} />}
                </div>
            </div>}
    
        </>

    );
}



export default FileUploader;