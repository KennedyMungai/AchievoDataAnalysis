import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import TopBar from '@/components/TopBar/TopBar'

export default function Home() {
	return (
		<main className='w-[94vw] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]'>
			<DashboardTemplate
				title={'Achievo Limited'}
				buttonName={'Regions'}
        buttonLink={'/regions'}
				dashboardCard1Value={8500}
				dashboardCard1Title={'Some Value'}
				dashboardCard2Value={4568}
				dashboardCard2Title={'Another Value'}
				dashboardCard3Value={55668}
				dashboardCard3Title={'Yet Another Value'}
				dashboardCard4Value={5200}
				dashboardCard4Title={'Some Other Value'}
				chartCardTitle={'All Branches Trends'}
				chartCardDescription={'The trends in all the branches'}
				chartCardContent={undefined}
				scrollAreaComponent={undefined}
			/>
		</main>
	)
}
