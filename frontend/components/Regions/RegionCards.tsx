'use client'
import React, { useEffect } from 'react'
import RegionCardTemplate from '../Templates/RegionCardTemplate'
import AddRegionCardTemplate from '../Templates/AddRegionCardTemplate'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { retrieveAllRegions, selectAllRegions } from '@/redux/features/regions/retrieveAllRegionsSlice'
import { LuMapPin } from "react-icons/lu"

type Props = {}

const RegionCards = (props: Props) => {
	const regions = useAppSelector(selectAllRegions)
	const dispatch = useAppDispatch()

	useEffect(() => {
        dispatch(retrieveAllRegions())
    }, [])

	return (
		<div className='p-5 w-90 flex flex-wrap items-center justify-center gap-2'>
			{regions.map((region) => {
				return (
					<RegionCardTemplate
						key={region.region_id}
						title={region.region_name}
						link={`regions/${region.region_id}`}
						content= {<LuMapPin className='text-8xl' />}
						createdAt={region.created_at!}
						regionId={region.region_id}
					/>
				)
			})}
			<AddRegionCardTemplate />
		</div>
	)
}

export default RegionCards
