'use client'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { retrieveTheStoreGraphingData, selectTheStoreGraphingData, selectTheStoreGraphingDataLabels } from '@/redux/features/stores/retrieveTheStoreGraphingDataSlice'
import { useEffect } from 'react'


type Props = {
	storeId: number
}

Chart.register(CategoryScale)

const StoreValueChart = ({ storeId }: Props) => {
	const dispatch = useAppDispatch()
	const data = useAppSelector(selectTheStoreGraphingData)
	const labels = useAppSelector(selectTheStoreGraphingDataLabels)

	useEffect(() => {
		dispatch(retrieveTheStoreGraphingData(storeId))
	}, [])
	

	const graphingData = {
		labels,
		datasets: [
			{
				label: 'Store Sections KSH',
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

export default StoreValueChart
