'use client'
import RegionValueChart from '@/components/Charts/RegionValueChart'
import TopRegionsIncidentsCard from '@/components/Stores/TopRegionsIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import {
	retrieveSingleRegion,
	selectSingleRegion
} from '@/redux/features/regions/retrieveSingleRegionSlice'
import {
	retrieveTheMostNotoriousStoreInARegion,
	selectTheMostNotoriousStoreInARegion
} from '@/redux/features/regions/retrieveTheMostNotoriousStoreInARegionSlice'
import {
	retrieveTheNumberOfIncidentsInAGivenRegion,
	selectTheIncidentCountPerRegion
} from '@/redux/features/regions/retrieveTheNumberOfIncidentsInAGivenRegionSlice'
import {
	retrieveTheTotalValueOfAllIncidentsInARegion,
	selectTheTotalValueOfIncidentsInARegion
} from '@/redux/features/regions/retrieveTheValueOfAllIncidentsInARegionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { LuEyeOff } from 'react-icons/lu'

type Props = {
	params: {
		regionId: string
	}
}

const SingleRegionPage = ({ params: { regionId } }: Props) => {
	const dispatch = useAppDispatch()
	const region = useAppSelector(selectSingleRegion)
	const incidentsCount = useAppSelector(selectTheIncidentCountPerRegion)
	const incidentsValue = useAppSelector(
		selectTheTotalValueOfIncidentsInARegion
	)
	const { store_name, max_value } = useAppSelector(
		selectTheMostNotoriousStoreInARegion
	)
	const { employee_job_title, is_logged_in } =
		useAppSelector(selectAuthStateData)

	useEffect(() => {
		dispatch(retrieveSingleRegion(Number(regionId)))
		dispatch(retrieveTheNumberOfIncidentsInAGivenRegion(Number(regionId)))
		dispatch(retrieveTheTotalValueOfAllIncidentsInARegion(Number(regionId)))
		dispatch(retrieveTheMostNotoriousStoreInARegion(Number(regionId)))
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={region.region_name}
				buttonLink={`/stores/${regionId}`}
				buttonName={'Stores'}
				dashboardCard1Value={incidentsCount}
				dashboardCard1Title={'Number of all Incidents'}
				dashboardCard2Value={incidentsValue.total_values}
				dashboardCard2Title={'Value Of all Incidents'}
				dashboardCard3Value={`${store_name} with KSH ${max_value}`}
				dashboardCard3Title={'Most Notorious Store'}
				chartCardTitle={'All branch trends'}
				chartCardDescription={
					'The trends in the branches on a day to day basis'
				}
				chartCardContent={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.AREA_MANAGER') ||
					employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR' ? (
						<RegionValueChart regionId={Number(regionId)} />
					) : (
						<LuEyeOff className='text-8xl' />
					)
				}
				scrollCardTitle={'Top 20 most valuable incidents'}
				scrollCardDescription={
					'The 20 incidents with the highest value'
				}
				scrollCardContent={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.AREA_MANAGER') ||
					employee_job_title === 'EmployeeJobTitle.ADMINISTRATOR' ? (
						<TopRegionsIncidentsCard regionId={Number(regionId)} />
					) : (
						<LuEyeOff className='text-8xl' />
					)
				}
			/>
		</div>
	)
}

export default SingleRegionPage
