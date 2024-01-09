'use client'
import {
    retrieveAllOfAStoresStoreSections,
    selectAllStoreSections
} from '@/redux/features/storeSections/retrieveAllStoreStoreSectionsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import AddStoreSectionCard from './AddStoreSectionCard'
import StoreSectionCard from './StoreSectionCard'
import { LuClipboardList } from "react-icons/lu"

type Props = {
	storeId: number
}

const StoreSectionCards = ({ storeId }: Props) => {
	const storeSections = useAppSelector(selectAllStoreSections)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveAllOfAStoresStoreSections(storeId))
	}, [])

	return (
		<div className='w-full flex flex-wrap justify-center gap-2 p-4'>
			{storeSections.map((storeSection) => (
				<StoreSectionCard
                    key={storeSection.store_section_id}
					title={storeSection.store_section_name}
					link={`/storeSections/singleStoreSection/${storeSection.store_section_id}`}
					content={<LuClipboardList className="text-8xl" />}
					createdAt={storeSection.created_at}
					storeSectionId={0}
				/>
			))}
            <AddStoreSectionCard store_id={storeId} />
		</div>
	)
}

export default StoreSectionCards
