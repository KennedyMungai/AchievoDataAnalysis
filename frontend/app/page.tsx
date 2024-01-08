'use client'
import OverallValueChart from '@/components/Charts/OverallValueChart'
import TopOverallIncidentsCard from '@/components/OverAll/TopOverallIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveTheMostNotoriousRegion,
	selectTheMostNotoriousRegionOverall
} from '@/redux/features/overall/retrieveTheMostNotoriousRegionSlice'
import {
	retrieveTheNumberOfOverallIncidents,
	selectTheNumberOfOverallIncidents
} from '@/redux/features/overall/retrieveTheNumberOfOverallIncidentsSlice'
import {
	retrieveTheValueOfOverallIncidents,
	selectTheOverallTotalValueOfIncidents
} from '@/redux/features/overall/retrieveTheValueOfOverallIncidentsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'

export default function Home() {
	const dispatch = useAppDispatch()
	const overallCount = useAppSelector(selectTheNumberOfOverallIncidents)
	const overallValue = useAppSelector(selectTheOverallTotalValueOfIncidents)
	const overallAverage = Number(overallValue) / overallCount
	const { region_name, max_value } = useAppSelector(
		selectTheMostNotoriousRegionOverall
	)

	const [isLoaded, setIsLoaded] = useState<boolean>(false)

	useEffect(() => {
		dispatch(retrieveTheNumberOfOverallIncidents())
		dispatch(retrieveTheValueOfOverallIncidents())
		dispatch(retrieveTheMostNotoriousRegion())
	}, [])

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	if (!isLoaded) {
		return
	}

	return (
		<main className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden scrollbar-hide'>
			<DashboardTemplate
				title={'Achievo Limited'}
				buttonName={'Regions'}
				buttonLink={'/regions'}
				dashboardCard1Value={overallCount}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={overallValue.total_values}
				dashboardCard2Title={'Value of all Incidents'}
				dashboardCard3Value={overallAverage}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={`${region_name} with KSH ${max_value}`}
				dashboardCard4Title={'Most Notorious Region'}
				chartCardTitle={'All Regions Trends'}
				chartCardDescription={
					'The trends in all the regions on a daily basis'
				}
				chartCardContent={<OverallValueChart />}
				scrollCardTitle={'Top twenty most valuable incidents'}
				scrollCardDescription={
					'The twenty incidents with the highest value'
				}
				scrollCardContent={<TopOverallIncidentsCard />}
			/>
		</main>
	)
}
