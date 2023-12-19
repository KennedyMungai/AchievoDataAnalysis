'use client'
import StoreValueChart from '@/components/Charts/StoreValueChart'
import TopIncidentsCard from '@/components/Stores/TopIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleStoreAverageIncidentValue,
	selectSingleStoreAverageIncidentValue
} from '@/redux/features/stores/retrieveSingleStoreIncidentsAverageSlice'
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
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		storeId: string
	}
}

const SingleStorePage = ({ params: { storeId } }: Props) => {
	const storeData = useAppSelector(selectSingleStore)
	const singleStoreCount = useAppSelector(selectSingleStoreIncidentsCount)
	const singleStoreValue = useAppSelector(selectSingleStoreIncidentsValue)
	const singleStoreAverage = useAppSelector(
		selectSingleStoreAverageIncidentValue
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStore(Number(storeId)))
		dispatch(retrieveSingleStoreIncidentsCount(Number(storeId)))
		dispatch(retrieveSingleStoresIncidentsValue(Number(storeId)))
		dispatch(retrieveSingleStoreAverageIncidentValue(Number(storeId)))
	}, [])

	console.log(singleStoreCount)

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={storeData.store_name}
				buttonName={'Store Sections'}
				buttonLink={`/storeSections/${storeId}`}
				dashboardCard1Value={singleStoreCount}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={singleStoreValue.total_values}
				dashboardCard2Title={'Value of all incidents'}
				dashboardCard3Value={singleStoreAverage.average_value}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={0}
				dashboardCard4Title={'Most Notorious Store Section'}
				chartCardTitle={'All store section trends'}
				chartCardDescription={'The trends in individual store sections'}
				chartCardContent={<StoreValueChart storeId={Number(storeId)} />}
				scrollCardTitle={'Top 20 most valuable incidents'}
				scrollCardDescription={
					'The 20 incidents with the highest value'
				}
				scrollCardContent={<TopIncidentsCard storeId={Number(storeId)} />}
			/>
		</div>
	)
}

export default SingleStorePage
