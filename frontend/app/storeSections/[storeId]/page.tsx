'use client'
import StoreSectionCards from '@/components/StoreSections/StoreSectionCards'
import { retrieveSingleStoreSection, selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		storeId: string
	}
}

const StoreSectionsPage = ({params: {storeId}}: Props) => {
	const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveSingleStoreSection(Number(storeId)))
	}, [])
	

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<StoreSectionCards storeId={Number(storeId)} />
		</div>
	)
}

export default StoreSectionsPage
