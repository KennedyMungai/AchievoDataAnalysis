'use client'
import {
	retrieveTheTopTwentyMostNotoriousOverallIncidents,
	selectTheMostNotoriousIncidentsOverall
} from '@/redux/features/overall/retrieveTheTopTwentyMostNotoriousOverallIncidentsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import TopOverallIncidentCard from './TopOverallIncidentCard'

type Props = {}

const TopOverallIncidentsCard = (props: Props) => {
	const dispatch = useAppDispatch()
	const incidents = useAppSelector(selectTheMostNotoriousIncidentsOverall)

	useEffect(() => {
		dispatch(retrieveTheTopTwentyMostNotoriousOverallIncidents())
	}, [])

	return (
		<div>
			{incidents.map((incident) => (
				<TopOverallIncidentCard key={incident.incident_id} />
			))}
		</div>
	)
}

export default TopOverallIncidentsCard
