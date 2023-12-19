'use client'
import { 
    retrieveTheTopTwentyIncidentsInARegion, 
    selectTopTwentyIncidentsInARegion 
} from '@/redux/features/regions/retrieveTheTopTwentyIncidentsInARegionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import TopRegionsIncidentCard from './TopRegionsIncidentCard'

type Props = {
    regionId: number
}

const TopRegionsIncidentsCard = ({regionId}: Props) => {
	const dispatch = useAppDispatch()
	const topIncidents = useAppSelector(selectTopTwentyIncidentsInARegion)

    useEffect(() => {
        dispatch(retrieveTheTopTwentyIncidentsInARegion(regionId))
    }, [])
    

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
