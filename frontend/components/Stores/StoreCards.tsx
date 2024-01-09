'use client'
import { selectSingleRegion } from '@/redux/features/regions/retrieveSingleRegionSlice'
import {
	retrieveRegionStores,
	selectAllRegionStores
} from '@/redux/features/stores/retrieveAllRegionStoresSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { LuStore } from "react-icons/lu"
import TopBar from '../TopBar/TopBar'
import AddStoreCardTemplate from './AddStoreCardTemplate'
import StoreCardTemplate from './StoreCardTemplate'

type Props = {
	regionId: number
}

const RegionStoresCards = ({ regionId }: Props) => {
	const regionStores = useAppSelector(selectAllRegionStores)
	const region = useAppSelector(selectSingleRegion)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveRegionStores(regionId))
	}, [])

	return (
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
									content={<LuStore className='text-8xl' />}
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
	)
}

export default RegionStoresCards
