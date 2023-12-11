import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import React from 'react'

type Props = {}

const SingleStorePage = (props: Props) => {
	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<DashboardTemplate
				title={''}
				buttonName={''}
				dashboardCard1Value={0}
				dashboardCard1Title={''}
				dashboardCard2Value={0}
				dashboardCard2Title={''}
				dashboardCard3Value={0}
				dashboardCard3Title={''}
				dashboardCard4Value={0}
				dashboardCard4Title={''}
				chartCardTitle={''}
				chartCardDescription={''}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</div>
	)
}

export default SingleStorePage
