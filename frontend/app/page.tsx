import DashboardTemplate from '@/components/Templates/DashboardTemplate'

export default function Home() {
	return (
		<main className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<DashboardTemplate
				title={'Achievo Limited'}
				buttonName={'Regions'}
				buttonLink={'/regions'}
				dashboardCard1Value={8500}
				dashboardCard1Title={'Number of all incidents'}
				dashboardCard2Value={4568}
				dashboardCard2Title={'Value of all Incidents'}
				dashboardCard3Value={55668}
				dashboardCard3Title={'The average value of all incidents'}
				dashboardCard4Value={5200}
				dashboardCard4Title={'Most Notorious Region'}
				chartCardTitle={'All Branches Trends'}
				chartCardDescription={'The trends in all the branches'}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</main>
	)
}
