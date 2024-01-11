'use client'
import OverallValueChart from '@/components/Charts/OverallValueChart'
import TopOverallIncidentsCard from '@/components/OverAll/TopOverallIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
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
import { LuEyeOff } from 'react-icons/lu'

export default function Home() {
	const dispatch = useAppDispatch()
	const overallCount = useAppSelector(selectTheNumberOfOverallIncidents)
	const overallValue = useAppSelector(selectTheOverallTotalValueOfIncidents)
	const { region_name, max_value } = useAppSelector(
		selectTheMostNotoriousRegionOverall
	)
	const { employee_job_title, is_logged_in } =
		useAppSelector(selectAuthStateData)

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
				dashboardCard1Value={
					is_logged_in &&
					(employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR') ? (
						overallCount
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={
					is_logged_in &&
					(employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR') ? (
						overallValue.total_values
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard2Title={'Value of all Incidents'}
				dashboardCard3Value={
					is_logged_in &&
					(employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR') ? (
						`${region_name} with KSH ${max_value}`
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard3Title={'Most Notorious Region'}
				chartCardTitle={'All Regions Trends'}
				chartCardDescription={
					'The trends in all the regions on a daily basis'
				}
				chartCardContent={
					is_logged_in &&
					(employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR') ? (
						<OverallValueChart />
					) : (
						<LuEyeOff className='text-8xl' />
					)
				}
				scrollCardTitle={'Top twenty most valuable incidents'}
				scrollCardDescription={
					'The twenty incidents with the highest value'
				}
				scrollCardContent={
					is_logged_in &&
					(employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR') ? (
						<TopOverallIncidentsCard />
					) : (
						<LuEyeOff className='text-8xl' />
					)
				}
			/>
		</main>
	)
}
