import RegionCards from '@/components/Regions/RegionCards'
import TopBar from '@/components/TopBar/TopBar'

type Props = {}

const RegionsPage = (props: Props) => {
	return (
		<main className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<TopBar pageTitle={'Regions'} />
			<RegionCards />
		</main>
	)
}

export default RegionsPage
