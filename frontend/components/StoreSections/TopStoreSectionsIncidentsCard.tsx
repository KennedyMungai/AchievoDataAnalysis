'use client'
import React from 'react'
import TopStoreSectionsIncidentCard from './TopStoreSectionsIncidentCard'

type Props = {
	incidents: IIncident[]
}

const TopStoreSectionsIncidentsCard = ({ incidents }: Props) => {
	return (
		<div>
			{incidents.map((incident) => (
				<TopStoreSectionsIncidentCard
					key={incident.incident_id}
					incident={incident}
				/>
			))}
		</div>
	)
}

export default TopStoreSectionsIncidentsCard
