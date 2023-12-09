import TopBar from '@/components/TopBar/TopBar'
import React from 'react'

type Props = {}

const RegionsPage = (props: Props) => {
	return <main  className="w-[94vw] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]">
        <TopBar pageTitle={'Regions'} />
        {/* TODO: Add the regions cards component */}
    </main>
}

export default RegionsPage
