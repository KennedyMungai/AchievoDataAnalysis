'use client'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleEmployee,
	selectSingleEmployee
} from '@/redux/features/employees/retrieveSingleEmployeesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		employeeId: string
	}
}

const EmployeeIncidentsPage = ({ params: { employeeId } }: Props) => {
	const dispatch = useAppDispatch()

	const {
		employee_email,
		created_at,
		employee_id,
		employee_job_title,
		employee_name,
		employee_password,
		employee_phone_number,
		is_loaded,
		region_id,
		store_id,
		updated_at
	} = useAppSelector(selectSingleEmployee)

	useEffect(() => {
		dispatch(retrieveSingleEmployee(Number(employeeId)))
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={employee_name}
				buttonName={'Find a Use for this button'}
				dashboardCard1Value={0}
				dashboardCard1Title={'Number Of All Incidents'}
				dashboardCard2Value={0}
				dashboardCard2Title={'Value Of All Incidents'}
				dashboardCard3Value={0}
				dashboardCard3Title={'Average Value Of All Incidents'}
				dashboardCard4Value={''}
				dashboardCard4Title={'The Most Notorious Incident'}
				chartCardTitle={'Employee Incidents Trend'}
				chartCardDescription={'The trend of all incidents reported by an employee'}
				chartCardContent={undefined}
				scrollCardTitle={'The 20 most valuable incidents'}
				scrollCardDescription={'The 20 incidents with the highest value'}
				scrollCardContent={undefined}
			/>
		</div>
	)
}

export default EmployeeIncidentsPage
