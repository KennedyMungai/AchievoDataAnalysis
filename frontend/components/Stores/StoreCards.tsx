'use client'
import { selectAuthState } from '@/redux/features/auth/authSlice'
import {
	allRegionStores,
	selectedRegionStores
} from '@/redux/features/regions/allStoresFromRegion'
import {
	getSingleRegion,
	selectSingleRegion
} from '@/redux/features/regions/singleRegionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import AddStoreCardTemplate from '../Templates/AddStoreCardTemplate'
import CardTemplate from '../Templates/CardTemplate'
import StoreCardTemplate from '../Templates/StoreCardTemplate'
import TopBar from '../TopBar/TopBar'

type Props = {
	regionId: number
}

const RegionStoresCards = ({ regionId }: Props) => {
	const regionStores = useAppSelector(selectedRegionStores)
	const region = useAppSelector(selectSingleRegion)
	const isLoggedIn = useAppSelector(selectAuthState)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(allRegionStores(regionId))
		dispatch(getSingleRegion(regionId))
	}, [])

	const content = isLoggedIn ? (
		<div className=''>
			<TopBar pageTitle={region.region_name} />
			<div className=''>
				<div className='w-full flex flex-wrap justify-center gap-2 p-4'>
					<>
						{regionStores.map((storeData) => {
							return (
								<StoreCardTemplate
									key={storeData.store_id}
									title={storeData.store_name}
									link={`/stores/${storeData.store_id}`}
									content={
										'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae exercitationem repellat eum saepe iure ab similique provident laboriosam a maxime soluta asperiores, adipisci architecto tempore nisi molestias sit. Reprehenderit fugiat magni odio dicta earum.'
									}
									createdAt={storeData.created_at!}
									storeId={storeData.store_id}
								/>
							)
						})}
						<AddStoreCardTemplate regionId={regionId} />
					</>
				</div>
			</div>
		</div>
	) : (
		<div className=''>
			<TopBar pageTitle={region.region_name} />
			<div className=''>
				<div className='w-full flex flex-wrap justify-center gap-2 p-4'>
					<>
						{regionStores.map((storeData) => {
							return (
								<CardTemplate
									key={storeData.store_id}
									title={storeData.store_name}
									link={`/stores/${storeData.store_id}`}
									content={
										'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae exercitationem repellat eum saepe iure ab similique provident laboriosam a maxime soluta asperiores, adipisci architecto tempore nisi molestias sit. Reprehenderit fugiat magni odio dicta earum.'
									}
									createdAt={storeData.created_at!}
								/>
							)
						})}
						<AddStoreCardTemplate regionId={regionId} />
					</>
				</div>
			</div>
		</div>
	)

	return content
}

export default RegionStoresCards
