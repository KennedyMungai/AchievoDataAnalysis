'use client'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js'
import {Line} from 'react-chartjs-2'

type Props = {
    storeId: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StoreCountChart = ({storeId}: Props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            }
        },
        title: {
            display: true,
            text: "Store Section No. Of Incidents"
        }
    }

	return <div className='lg:w-full w-[80vw] border rounded-lg bg-white h-[60vh] dark:bg-slate-900 p-5 flex items-center justify-center'>
        <Line options={options} data={data} />
    </div>
}

export default StoreCountChart
