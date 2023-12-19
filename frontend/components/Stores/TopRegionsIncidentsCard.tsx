'use client'
import { selectTopTwentyIncidentsInARegion } from '@/redux/features/regions/retrieveTheTopTwentyIncidentsInARegionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'
import TopIncidentCard from './TopIncidentCard'
import TopRegionsIncidentCard from './TopRegionsIncidentCard'

type Props = {}

const TopRegionsIncidentsCard = (props: Props) => {
	const dispatch = useAppDispatch()
	const topIncidents = useAppSelector(selectTopTwentyIncidentsInARegion)

	return (
		<div>
			{topIncidents.map((incident) => (
				<TopRegionsIncidentCard
					key={incident.incident_id}
					incident={incident}
				/>
			))}
		</div>
	)
}

export default TopRegionsIncidentsCard
