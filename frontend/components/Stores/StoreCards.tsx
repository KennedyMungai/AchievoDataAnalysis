'use client'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import { selectSingleRegion } from '@/redux/features/regions/retrieveSingleRegionSlice'
import {
	retrieveRegionStores,
	selectAllRegionStores
} from '@/redux/features/stores/retrieveAllRegionStoresSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import CardTemplate from '../Templates/CardTemplate'
import TopBar from '../TopBar/TopBar'
import AddStoreCardTemplate from './AddStoreCardTemplate'
import StoreCardTemplate from './StoreCardTemplate'

type Props = {
	regionId: number
}

const RegionStoresCards = ({ regionId }: Props) => {
	const isLoggedIn = useAppSelector(selectAuthStateData).is_logged_in
	const regionStores = useAppSelector(selectAllRegionStores)
	const region = useAppSelector(selectSingleRegion)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveRegionStores(regionId))
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
									link={`/stores/singleStore/${storeData.store_id}`}
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
									link={`/stores/singleStore/${storeData.store_id}`}
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
