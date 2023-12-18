'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import ScrollAreaComponentTemplate from '@/components/Templates/ScrollAreaComponentTemplate'
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
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={region.region_name}
				buttonLink={`/stores/${regionId}`}
				buttonName={'Stores'}
				dashboardCard1Value={538}
				dashboardCard1Title={'Number of all Incidents'}
				dashboardCard2Value={536997}
				dashboardCard2Title={'Value Of all Incidents'}
				dashboardCard3Value={5632}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={51151}
				dashboardCard4Title={'Most Notorious Store'}
				chartCardTitle={'All branch trends'}
				chartCardDescription={
					'The trends in the branches on a day to day basis'
				}
				chartCardContent={undefined}
				scrollAreaComponent={
					<ScrollAreaComponentTemplate
						title={'Top Offending Stores'}
						description={
							'A simple list of the top offending stores'
						}
						content={undefined}
					/>
				}
			/>
		</div>
	)
}

export default SingleRegionPage
