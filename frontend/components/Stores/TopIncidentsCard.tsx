'use client'
import retrieveTopTwentyMostValuableIncidentsInAStoreSlice, {
	retrieveTopTwentyMostValuableIncidentsInAStore,
	selectTopTwentyMostValuableIncidentsInAStore
} from '@/redux/features/stores/retrieveTopTwentyMostValuableIncidentsInAStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

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
				<div
					key={incident.incident_id}
					className='p-2 bg-slate-50 dark:bg-slate-900 rounded-md'
				>
					{incident.incident_description}
				</div>
			))}
		</div>
	)
}

export default TopIncidentsCard
