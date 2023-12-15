import ChartCardTemplate from '@/components/Templates/ChartCardTemplate'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import ScrollAreaComponentTemplate from '@/components/Templates/ScrollAreaComponentTemplate'

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
				chartCardTitle={'All Regions Trends'}
				chartCardDescription={
					'The trends in all the regions on a daily basis'
				}
				chartCardContent={undefined}
				scrollAreaComponent={
					<ScrollAreaComponentTemplate
						title={'Top Offenders'}
						description={'The top offending regions'}
						content={undefined}
					/>
				}
			/>
		</main>
	)
}
