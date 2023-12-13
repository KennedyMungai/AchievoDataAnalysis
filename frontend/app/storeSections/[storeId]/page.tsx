import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import React from 'react'

type Props = {}

const StoreSectionsPage = (props: Props) => {
	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<DashboardTemplate
				title={'Store Section Name'}
				buttonName={'Add Incident'}
				dashboardCard1Value={8500}
				dashboardCard1Title={'Some Value'}
				dashboardCard2Value={7859}
				dashboardCard2Title={'Some Other Value'}
				dashboardCard3Value={78542}
				dashboardCard3Title={'Another Value'}
				dashboardCard4Value={7878}
				dashboardCard4Title={'Different Value'}
				chartCardTitle={'Store Section Data'}
				chartCardDescription={'Store Section Data Described'}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</div>
	)
}

export default StoreSectionsPage
