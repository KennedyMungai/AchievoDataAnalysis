'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import Link from 'next/link'

type Props = {}

export const Columns: ColumnDef<IEmployee>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => {
					// TODO: This logic probably doesn't work
					table.toggleAllPageRowsSelected(value ? true : false)
				}}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value)
				}}
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'employee_id',
		header: 'ID',
		enableHiding: false,
		enableSorting: false
	},
	{
		accessorKey: 'employee_email',
		header: 'Email'
	},
	{
		accessorKey: 'employee_phone_number',
		header: 'Phone Number'
	},
	{
		accessorKey: 'employee_job_title',
		header: 'Job Title'
	},
	{
		accessorKey: 'employee_name',
		header: ({ column }) => {
			return (
				<Button
					variant={'ghost'}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					First Name <ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		cell: ({ row }) => {
			const date = row.getValue('created_at')
			const formatted = new Date(date as string).toLocaleDateString(
				'en-US'
			)
			return <div className=''>{formatted}</div>
		}
	},
	{
		accessorKey: 'updated_at',
		header: 'Updated At',
		cell: ({ row }) => {
			const date = row.getValue('updated_at')
			const formatted = new Date(date as string).toLocaleDateString(
				'en-US'
			)
			return <div className=''>{formatted}</div>
		}
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={'ghost'} size={'icon'}>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>
							<Link
								href={`/employees/incidents/${row.getValue(
									'employee_id'
								)}`}
							>
								<Button
									variant={'ghost'}
									size={'sm'}
									className='w-full'
								>
									Incidents
								</Button>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button
								variant={'destructive'}
								size={'sm'}
								className='w-full'
							>
								Delete
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
		enableHiding: false
	}
]
