'use client'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	selectARegionsGraphingData,
	selectARegionsGraphingDataLabels
} from '@/redux/features/regions/retrieveARegionsGraphingDataSlice'

type Props = {
	regionId: number
}

Chart.register(CategoryScale)

const RegionValueChart = ({ regionId: storeId }: Props) => {
	const dispatch = useAppDispatch()
	const data = useAppSelector(selectARegionsGraphingData)
	const labels = useAppSelector(selectARegionsGraphingDataLabels)

	const graphingData = {
		labels,
		datasets: [
			{
				label: 'Stores $',
				data,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgb(53, 162, 235, 0.4'
			}
		]
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const
			}
		},
		title: {
			display: true,
			text: 'Store Section No. Of Incidents'
		}
	}

	return (
		<div className='lg:w-full w-[80vw] border rounded-lg bg-white h-[60vh] dark:bg-slate-900 p-5 flex items-center justify-center'>
			<Line options={options} data={graphingData} />
		</div>
	)
}

export default RegionValueChart
