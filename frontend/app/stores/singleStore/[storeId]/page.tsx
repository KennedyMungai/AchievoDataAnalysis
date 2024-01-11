'use client'
import StoreValueChart from '@/components/Charts/StoreValueChart'
import TopIncidentsCard from '@/components/Stores/TopIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import {
	retrieveSingleStoreIncidentsCount,
	selectSingleStoreIncidentsCount
} from '@/redux/features/stores/retrieveSingleStoreIncidentsCountSlice'
import {
	retrieveSingleStoresIncidentsValue,
	selectSingleStoreIncidentsValue
} from '@/redux/features/stores/retrieveSingleStoreIncidentsValueSlice'
import {
	retrieveSingleStore,
	selectSingleStore
} from '@/redux/features/stores/retrieveSingleStoreSlice'
import {
	retrieveTheMostNotoriousStoreSection,
	selectMostNotoriousSectionData
} from '@/redux/features/stores/retrieveTheMostNotoriousStoreSectionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { LuEyeOff } from 'react-icons/lu'

type Props = {
	params: {
		storeId: string
	}
}

const SingleStorePage = ({ params: { storeId } }: Props) => {
	const storeData = useAppSelector(selectSingleStore)
	const singleStoreCount = useAppSelector(selectSingleStoreIncidentsCount)
	const singleStoreValue = useAppSelector(selectSingleStoreIncidentsValue)
	const { max_value, store_section_name } = useAppSelector(
		selectMostNotoriousSectionData
	)
	const { is_logged_in, employee_job_title } =
		useAppSelector(selectAuthStateData)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStore(Number(storeId)))
		dispatch(retrieveSingleStoreIncidentsCount(Number(storeId)))
		dispatch(retrieveSingleStoresIncidentsValue(Number(storeId)))
		dispatch(retrieveTheMostNotoriousStoreSection(Number(storeId)))
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={storeData.store_name}
				buttonName={'Store Sections'}
				buttonLink={`/storeSections/${storeId}`}
				dashboardCard1Value={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.ADMINISTRATOR') ||
					employee_job_title === 'EmployeeJobTitle.AREA_MANAGER' ||
					employee_job_title === 'EmployeeJobTitle.LCM' ? (
						singleStoreCount
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.ADMINISTRATOR') ||
					employee_job_title === 'EmployeeJobTitle.AREA_MANAGER' ||
					employee_job_title === 'EmployeeJobTitle.LCM' ? (
						singleStoreValue.total_values
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard2Title={'Value of all incidents'}
				dashboardCard3Value={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.ADMINISTRATOR') ||
					employee_job_title === 'EmployeeJobTitle.AREA_MANAGER' ||
					employee_job_title === 'EmployeeJobTitle.LCM' ? (
						`${store_section_name} with KSH ${max_value}`
					) : (
						<LuEyeOff className='text-2xl' />
					)
				}
				dashboardCard3Title={'Most Notorious Store Section'}
				chartCardTitle={'All store section trends'}
				chartCardDescription={'The trends in individual store sections'}
				chartCardContent={
					(is_logged_in &&
						employee_job_title ===
							'EmployeeJobTitle.ADMINISTRATOR') ||
					employee_job_title === 'EmployeeJobTitle.AREA_MANAGER' ||
					employee_job_title === 'EmployeeJobTitle.LCM' ? (
						<StoreValueChart storeId={Number(storeId)} />
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
							'EmployeeJobTitle.ADMINISTRATOR') ||
					employee_job_title === 'EmployeeJobTitle.AREA_MANAGER' ||
					employee_job_title === 'EmployeeJobTitle.LCM' ? (
						<TopIncidentsCard storeId={Number(storeId)} />
					) : (
						<LuEyeOff className='text-8xl' />
					)
				}
			/>
		</div>
	)
}

export default SingleStorePage
