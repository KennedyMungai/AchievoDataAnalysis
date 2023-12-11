'use client'
import axios from 'axios'
import React, { useEffect } from 'react'
import RegionCardTemplate from '../Templates/RegionCardTemplate'
import AddRegionCardTemplate from '../Templates/AddRegionCardTemplate'

type Props = {}

const RegionCards = (props: Props) => {
	const regions: IRegion[] = []

	useEffect(() => {
		const getRegionsData = async () => {
			return (await axios.get('http://localhost:8000/regions')).data
		}

		const regions = getRegionsData()
	}, [])

	return <>
    {regions.map((region) => {
        return (
            <RegionCardTemplate
                key={region.region_id}
                title={region.region_name}
                link={`regions/${region.region_id}`}
                content={
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae exercitationem repellat eum saepe iure ab similique provident laboriosam a maxime soluta asperiores, adipisci architecto tempore nisi molestias sit. Reprehenderit fugiat magni odio dicta earum.'
                }
                createdAt={region.created_at!}
                regionId={region.region_id}
            />
        )
    })}
    <AddRegionCardTemplate />
</>
}

export default RegionCards
