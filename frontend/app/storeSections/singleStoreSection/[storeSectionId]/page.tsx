'use client'
import StoreSectionValueChart from '@/components/Charts/StoreSectionValueChart'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleStoreSection,
	selectSingleStoreSection
} from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		storeSectionId: string
	}
}

const SingleStoreSectionPage = ({ params: { storeSectionId } }: Props) => {
	const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStoreSection(Number(storeSectionId)))
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={`${storeData.store_name} ${storeSectionData.store_section_name}`}
				buttonName={'Add Incident'}
				dashboardCard1Value={8500}
				dashboardCard1Title={'Number of all Incidents'}
				dashboardCard2Value={7859}
				dashboardCard2Title={'The value of all incidents'}
				dashboardCard3Value={78542}
				dashboardCard3Title={'The average value of incidents'}
				dashboardCard4Value={7878}
				dashboardCard4Title={'The most notorious incident'}
				chartCardTitle={'All incidents trends'}
				chartCardDescription={
					'The trends for all the incidents inside a store section'
				}
				chartCardContent={<StoreSectionValueChart storeSectionId={Number(storeSectionId)} />}
				scrollCardTitle={'Top 20 most valuable incidents'}
				scrollCardDescription={'The 20 incidents with the highest value'}
				scrollCardContent={undefined}
			/>
		</div>
	)
}

export default SingleStoreSectionPage
