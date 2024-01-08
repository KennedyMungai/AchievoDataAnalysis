'use client'
import EmployeeValueChart from '@/components/Employees/EmployeeValueChart'
import TopStoreSectionsIncidentsCard from '@/components/StoreSections/TopStoreSectionsIncidentsCard'
import DashboardTemplate from '@/components/Templates/DashboardTemplate'
import {
	retrieveSingleEmployee,
	selectSingleEmployee
} from '@/redux/features/employees/retrieveSingleEmployeesSlice'
import {
	retrieveTheMostNotoriousIncidentReportedByAnEmployee,
	selectTheMostNotoriousIncidentReportedByAnEmployee
} from '@/redux/features/employees/retrieveTheMostNotoriousIncidentReportedByAnEmployeeSlice'
import {
	retrieveTheNumberOfIncidentsReportedByAnEmployee,
	selectTheNumberOfIncidentsReportedByAnEmployee
} from '@/redux/features/employees/retrieveTheNumberOfIncidentsReportedByAnEmployeeSlice'
import {
	retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee,
	selectTheTenMostNotoriousIncidentsReportedByAnEmployee
} from '@/redux/features/employees/retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeSlice'
import {
	retrieveTheValueOfIncidentsReportedByAnEmployee,
	selectTheValueOfIncidentsReportedByAnEmployee
} from '@/redux/features/employees/retrieveTheValueOfIncidentsReportedByAnEmployeeSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'

type Props = {
	params: {
		employeeId: string
	}
}

const EmployeeIncidentsPage = ({ params: { employeeId } }: Props) => {
	const dispatch = useAppDispatch()

	const numberOfIncidents = useAppSelector(
		selectTheNumberOfIncidentsReportedByAnEmployee
	)
	const valueOfIncidents = useAppSelector(
		selectTheValueOfIncidentsReportedByAnEmployee
	)
	const { total_value } = useAppSelector(
		selectTheMostNotoriousIncidentReportedByAnEmployee
	)
	const incidents = useAppSelector(
		selectTheTenMostNotoriousIncidentsReportedByAnEmployee
	)

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
		dispatch(
			retrieveTheNumberOfIncidentsReportedByAnEmployee(Number(employeeId))
		)
		dispatch(
			retrieveTheValueOfIncidentsReportedByAnEmployee(Number(employeeId))
		)
		dispatch(
			retrieveTheMostNotoriousIncidentReportedByAnEmployee(
				Number(employeeId)
			)
		)
		dispatch(
			retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee(
				Number(employeeId)
			)
		)
	}, [])

	return (
		<div className='min-h-screen ml-[5rem] bg-slate-100 dark:bg-slate-800 overflow-x-hidden'>
			<DashboardTemplate
				title={employee_name}
				buttonName={'Edit Employee'}
				dashboardCard1Value={numberOfIncidents}
				dashboardCard1Title={'Number Of All Incidents'}
				dashboardCard2Value={valueOfIncidents}
				dashboardCard2Title={'Value Of All Incidents'}
				dashboardCard3Value={total_value}
				dashboardCard3Title={'The Most Notorious Incident'}
				chartCardTitle={'Employee Incidents Trend'}
				chartCardDescription={
					'The trend of all incidents reported by an employee'
				}
				chartCardContent={
					<EmployeeValueChart employeeId={Number(employeeId)} />
				}
				scrollCardTitle={'The 20 most valuable incidents'}
				scrollCardDescription={
					'The 20 incidents with the highest value'
				}
				scrollCardContent={
					<TopStoreSectionsIncidentsCard incidents={incidents} />
				}
			/>
		</div>
	)
}

export default EmployeeIncidentsPage
