import RegionStoresCards from '@/components/Stores/StoreCards'

type Props = {
	params: {
		regionId: string
	}
}

const RegionStoresPage = ({ params: { regionId } }: Props) => {
	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<RegionStoresCards regionId={Number(regionId)} />
		</div>
	)
}

export default RegionStoresPage
