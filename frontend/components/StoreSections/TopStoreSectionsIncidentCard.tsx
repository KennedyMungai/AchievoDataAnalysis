'use client'
import moment from 'moment'

type Props = {
	incident: IIncident
}

const TopStoreSectionsIncidentCard = ({ incident }: Props) => {
	return (
		<div className='font-semibold bg-slate-300 dark:bg-slate-600 my-2 p-2 rounded-md flex justify-between'>
			<span className='float-right'>
				{moment(incident.created_at).format('HH:mm:ss')}
			</span>
			<span className='text-left'>{incident.incident_description}</span>
			<span>KSH {incident.total_value}</span>
		</div>
	)
}

export default TopStoreSectionsIncidentCard
