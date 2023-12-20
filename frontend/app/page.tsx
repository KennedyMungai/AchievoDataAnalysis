'use client'
import OverallValueChart from '@/components/Charts/OverallValueChart'
import TopOverallIncidentsCard from '@/components/OverAll/TopOverallIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import { useAppDispatch } from '@/redux/hooks'

export default function Home() {
	const dispatch = useAppDispatch()

	return (
		<main className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={'Achievo Limited'}
				buttonName={'Regions'}
				buttonLink={'/regions'}
				dashboardCard1Value={8500}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={4568}
				dashboardCard2Title={'Value of all Incidents'}
				dashboardCard3Value={55668}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={5200}
				dashboardCard4Title={'Most Notorious Region'}
				chartCardTitle={'All Regions Trends'}
				chartCardDescription={
					'The trends in all the regions on a daily basis'
				}
				chartCardContent={<OverallValueChart />}
				scrollCardTitle={'Top twenty most valuable incidents'}
				scrollCardDescription={'The twenty incidents with the highest value'}
				scrollCardContent={<TopOverallIncidentsCard />}
			/>
		</main>
	)
}
