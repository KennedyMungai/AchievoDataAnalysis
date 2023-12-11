import RegionStoresCards from "@/components/Stores/StoreCards"


type Props = {
	params: {
		regionStoreId: string
	}
}

const RegionStoresPage = ({params: {regionStoreId}}: Props) => {
	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
            <RegionStoresCards regionId={Number(regionStoreId)} />
		</div>
	)
}

export default RegionStoresPage
