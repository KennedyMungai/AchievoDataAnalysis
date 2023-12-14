'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import ScrollAreaComponentTemplate from '@/components/Templates/ScrollAreaComponentTemplate'
import { selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
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
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStore(Number(storeId)))
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<DashboardTemplate
				title={storeData.store_name}
				buttonName={'Store Sections'}
				buttonLink={`/storeSections/${storeId}`}
				dashboardCard1Value={0}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={0}
				dashboardCard2Title={'Value of all incidents'}
				dashboardCard3Value={0}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={0}
				dashboardCard4Title={'Most Notorious Store Section'}
				chartCardTitle={'All store section trends'}
				chartCardDescription={'The trends in individual store sections'}
				chartCardContent={undefined}
				scrollAreaComponent={
					<ScrollAreaComponentTemplate
						title={'Top offending store sections'}
						description={
							'A list of the top offending store sections'
						}
					/>
				}
			/>
		</div>
	)
}

export default SingleStorePage
