'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import { retrieveSingleStoreSection, selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
    params: {
        storeSectionId: string
    }
}

const SingleStoreSectionPage = ({params: {storeSectionId}}: Props) => {
    const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStoreSection(Number(storeSectionId)))
	}, [])
	

	return <div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
    <DashboardTemplate
        title={`${storeData.store_name} ${storeSectionData.store_section_name}`}
        buttonName={'Add Incident'}
        dashboardCard1Value={8500}
        dashboardCard1Title={'Some Value'}
        dashboardCard2Value={7859}
        dashboardCard2Title={'Some Other Value'}
        dashboardCard3Value={78542}
        dashboardCard3Title={'Another Value'}
        dashboardCard4Value={7878}
        dashboardCard4Title={'Different Value'}
        chartCardTitle={'Store Section Data'}
        chartCardDescription={'Store Section Data Described'}
        chartCardContent={undefined}
        scrollAreaComponent={undefined}
    />
</div>
}

export default SingleStoreSectionPage
