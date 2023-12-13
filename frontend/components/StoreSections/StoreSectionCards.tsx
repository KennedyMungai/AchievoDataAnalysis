'use client'
import {
    retrieveAllOfAStoresStoreSections,
    selectAllStoreSections
} from '@/redux/features/storeSections/retrieveAllStoreStoreSectionsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import AddStoreSectionCard from './AddStoreSectionCard'
import StoreSectionCard from './StoreSectionCard'

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
					content={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae exercitationem repellat eum saepe iure ab similique provident laboriosam a maxime soluta asperiores, adipisci architecto tempore nisi molestias sit. Reprehenderit fugiat magni odio dicta earum.'}
					createdAt={storeSection.created_at}
					storeSectionId={0}
				/>
			))}
            <AddStoreSectionCard store_id={storeId} />
		</div>
	)
}

export default StoreSectionCards
