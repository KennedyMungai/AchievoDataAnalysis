'use client'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

type Props = {
	regionId: number
}

Chart.register(CategoryScale)

const RegionValueChart = ({ regionId: storeId }: Props) => {
	const data = {
		labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				label: 'Stores $',
				data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
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
			<Line options={options} data={data} />
		</div>
	)
}

export default RegionValueChart
