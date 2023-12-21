'use client'
import StoreSectionValueChart from '@/components/Charts/StoreSectionValueChart'
import TopStoreSectionsIncidentsCard from '@/components/StoreSections/TopStoreSectionsIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleStoreSection,
	selectSingleStoreSection
} from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectTheAverageValueOfAllIncidentsInAStoreSection } from '@/redux/features/storeSections/retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionSlice'
import { retrieveTheMostNotoriousIncidentInAStoreSection, selectTheMostNotoriousIncidentInAStoreSection } from '@/redux/features/storeSections/retrieveTheMostNotoriousIncidentInAStoreSectionSlice'
import { retrieveTheNumberOfAllTheIncidentsInAStoreSection, selectTheNumberOfIncidentsInAStoreSection } from '@/redux/features/storeSections/retrieveTheNumberOfAllTheIncidentsInAStoreSectionSlice'
import {
	retrieveTheTopTwentyIncidentsInAStoreSection,
	selectTheTopTwentyIncidentsInAStoreSection
} from '@/redux/features/storeSections/retrieveTheTopTwentyIncidentsInAStoreSectionSlice'
import {
	retrieveTheValueOfAllIncidentsInAStoreSection,
	selectTheTotalValueOfIncidentsInAStoreSection
} from '@/redux/features/storeSections/retrieveTheValueOfAllTheIncidentsInAStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		storeSectionId: string
	}
}

const SingleStoreSectionPage = ({ params: { storeSectionId } }: Props) => {
	const dispatch = useAppDispatch()
	const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const topTwentyIncidents = useAppSelector(selectTheTopTwentyIncidentsInAStoreSection)
	const storeSectionIncidentsValue = useAppSelector(selectTheTotalValueOfIncidentsInAStoreSection)
	const storeSectionIncidentCount = useAppSelector(selectTheNumberOfIncidentsInAStoreSection)
	const storeSectionIncidentsAverage = useAppSelector(selectTheAverageValueOfAllIncidentsInAStoreSection)
	const {total_value} = useAppSelector(selectTheMostNotoriousIncidentInAStoreSection)

	useEffect(() => {
		dispatch(retrieveSingleStoreSection(Number(storeSectionId)))
		dispatch(retrieveTheTopTwentyIncidentsInAStoreSection(Number(storeSectionId)))
		dispatch(retrieveTheValueOfAllIncidentsInAStoreSection(Number(storeSectionId)))
		dispatch(retrieveTheNumberOfAllTheIncidentsInAStoreSection(Number(storeSectionId)))
		dispatch(retrieveTheMostNotoriousIncidentInAStoreSection(Number(storeSectionId)))
	}, [])

	console.log(storeSectionIncidentsAverage)
	console.log(storeSectionIncidentsValue)

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={`${storeData.store_name} ${storeSectionData.store_section_name}`}
				buttonName={'Add Incident'}
				dashboardCard1Value={storeSectionIncidentCount}
				dashboardCard1Title={'Number of all Incidents'}
				dashboardCard2Value={storeSectionIncidentsValue}
				dashboardCard2Title={'The value of all incidents'}
				dashboardCard3Value={storeSectionIncidentsAverage}
				dashboardCard3Title={'The average value of incidents'}
				dashboardCard4Value={total_value}
				dashboardCard4Title={'The most notorious incident'}
				chartCardTitle={'All incidents trends'}
				chartCardDescription={
					'The trends for all the incidents inside a store section'
				}
				chartCardContent={<StoreSectionValueChart storeSectionId={Number(storeSectionId)} />}
				scrollCardTitle={'Top 20 most valuable incidents'}
				scrollCardDescription={'The 20 incidents with the highest value'}
				scrollCardContent={<TopStoreSectionsIncidentsCard incidents={topTwentyIncidents} />}
			/>
		</div>
	)
}

export default SingleStoreSectionPage
