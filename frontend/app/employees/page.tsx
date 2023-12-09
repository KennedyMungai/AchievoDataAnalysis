import TopBar from '@/components/TopBar/TopBar'
import React from 'react'

type Props = {}

const EmployeesPage = (props: Props) => {
	return (
		<main className='w-[94vw] min-h-screen bg-slate-200 dark:bg-slate-800 ml-[6vw]'>
			<TopBar pageTitle={'Employees'} />
		</main>
	)
}

export default EmployeesPage