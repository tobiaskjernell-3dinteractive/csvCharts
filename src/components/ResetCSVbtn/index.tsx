const ResetCSVbtn = ({callback}:{callback: () => void}) => {
    return (
        <button className="font-semibold hover:bg-gray-300 bg-white border px-5 py-2 cursor-pointer rounded-sm shadow-sm shadow-black" onClick={callback}>New CSV</button>
    )
}

export default ResetCSVbtn;