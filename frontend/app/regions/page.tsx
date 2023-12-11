import RegionCards from '@/components/Regions/RegionCards'
import TopBar from '@/components/TopBar/TopBar'

type Props = {}

const RegionsPage = (props: Props) => {
	return (
		<main className='w-[94rem] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]'>
			<TopBar pageTitle={'Regions'} />
			<RegionCards />
		</main>
	)
}

export default RegionsPage
