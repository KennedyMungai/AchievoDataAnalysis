'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
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
				dashboardCard1Title={'Some Value'}
				dashboardCard2Value={0}
				dashboardCard2Title={'Some Value'}
				dashboardCard3Value={0}
				dashboardCard3Title={'Some Value'}
				dashboardCard4Value={0}
				dashboardCard4Title={'Some Value'}
				chartCardTitle={'Some Title'}
				chartCardDescription={'Some Description'}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</div>
	)
}

export default SingleStorePage
