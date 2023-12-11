import EmployeesTable from '@/components/Employees/EmployeesTable'
import TopBar from '@/components/TopBar/TopBar'
import React from 'react'

type Props = {}

const EmployeesPage = (props: Props) => {
	return (
		<main className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800'>
			<TopBar pageTitle={'Employees'} />
			<EmployeesTable />
		</main>
	)
}

export default EmployeesPage
