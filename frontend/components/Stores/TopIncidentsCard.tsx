'use client'
import {
    retrieveTopTwentyMostValuableIncidentsInAStore,
    selectTopTwentyMostValuableIncidentsInAStore
} from '@/redux/features/stores/retrieveTopTwentyMostValuableIncidentsInAStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import TopIncidentCard from './TopIncidentCard'

type Props = {
	storeId: number
}

const TopIncidentsCard = ({ storeId }: Props) => {
	const dispatch = useAppDispatch()
	const incidents = useAppSelector(
		selectTopTwentyMostValuableIncidentsInAStore
	)

	useEffect(() => {
		dispatch(retrieveTopTwentyMostValuableIncidentsInAStore(storeId))
	}, [])

	return (
		<div>
			{incidents.map((incident) => (
				<TopIncidentCard key={incident.incident_description} incident={incident} />
			))}
		</div>
	)
}

export default TopIncidentsCard
