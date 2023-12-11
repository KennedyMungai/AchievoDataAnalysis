'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleRegion,
	selectSingleRegion
} from '@/redux/features/regions/retrieveSingleRegionSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

type Props = {
	params: {
		regionId: string
	}
}

const SingleRegionPage = ({ params: { regionId } }: Props) => {
	const dispatch = useAppDispatch()
	const region = useAppSelector(selectSingleRegion)

	useEffect(() => {
		dispatch(retrieveSingleRegion(Number(regionId)))
	}, [])

	return (
		<div className='w-[94rem] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]'>
			<DashboardTemplate
				title={region.region_name}
				buttonLink={`/stores/${regionId}`}
				buttonName={'Stores'}
				dashboardCard1Value={538}
				dashboardCard1Title={'No. Of Incidents'}
				dashboardCard2Value={536997}
				dashboardCard2Title={'Value Of Incidents'}
				dashboardCard3Value={5632}
				dashboardCard3Title={'Value of Incidents from top store'}
				dashboardCard4Value={51151}
				dashboardCard4Title={'Value of Most Recurring Incident'}
				chartCardTitle={'Some Card Title'}
				chartCardDescription={'Some Card Description'}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</div>
	)
}

export default SingleRegionPage
