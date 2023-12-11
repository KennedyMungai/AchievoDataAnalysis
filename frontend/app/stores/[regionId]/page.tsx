import RegionStoresCards from "@/components/Stores/StoreCards"


type Props = {
	params: {
		regionStoreId: string
	}
}

const RegionStoresPage = ({params: {regionStoreId}}: Props) => {
	return (
		<div className='w-[94rem] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]'>
            <RegionStoresCards regionId={Number(regionStoreId)} />
		</div>
	)
}

export default RegionStoresPage
