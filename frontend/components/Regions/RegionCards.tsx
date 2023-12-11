'use client'

import { selectAuthState } from '@/redux/features/auth/authSlice'
import {
	getAllRegions,
	selectAllRegions
} from '@/redux/features/regions/allRegionsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import AddRegionCardTemplate from '../Templates/AddRegionCardTemplate'
import CardTemplate from '../Templates/CardTemplate'
import RegionCardTemplate from '../Templates/RegionCardTemplate'

type Props = {}

const RegionCards = (props: Props) => {
	const regionsData = useAppSelector(selectAllRegions)
	const isLoggedIn = useAppSelector(selectAuthState)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllRegions())
	}, [])

	const content = isLoggedIn ? (
		<div className='p-5 w-90 flex flex-wrap items-center justify-center gap-2'>
			<>
				{regionsData.map((region) => {
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
		</div>
	) : (
		<div className='p-5 w-90 flex flex-wrap items-center justify-center gap-2'>
			<>
				{regionsData.map((region) => {
					return (
						<CardTemplate
							key={region.region_id}
							title={region.region_name}
							link={`regions/${region.region_id}`}
							content={
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae exercitationem repellat eum saepe iure ab similique provident laboriosam a maxime soluta asperiores, adipisci architecto tempore nisi molestias sit. Reprehenderit fugiat magni odio dicta earum.'
							}
							createdAt={region.created_at!}
						/>
					)
				})}
				<AddRegionCardTemplate />
			</>
		</div>
	)

	return content
}

export default RegionCards
