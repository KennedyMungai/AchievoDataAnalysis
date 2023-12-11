'use client'

import { retrieveAllEmployees, selectAllEmployees } from '@/redux/features/employees/retrieveAllEmployeesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { Columns } from './Columns'
import { DataTable } from './DataTable'

type Props = {}

const EmployeesTable = (props: Props) => {
    const employeeData = useAppSelector(selectAllEmployees)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveAllEmployees())
    }, [])
    

	return (
		<div className='p-5'>
			<DataTable columns={Columns} data={employeeData} />
		</div>
	)
}

export default EmployeesTable
