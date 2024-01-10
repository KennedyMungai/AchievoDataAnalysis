'use client'
import moment from 'moment'
import React from 'react'

type Props = {
	incident: IIncident
}

const TopRegionsIncidentCard = ({ incident }: Props) => {
	return (
		<div className='font-semibold bg-slate-300 dark:bg-slate-600 my-2 p-2 rounded-md flex justify-between'>
			<span className='float-right'>
				{moment(incident.created_at).format('HH:mm:ss')}
			</span>
			<span className='text-xs font-bold'>{incident.incident_description}</span>
			<span>KSH {incident.total_value}</span>
		</div>
	)
}

export default TopRegionsIncidentCard
