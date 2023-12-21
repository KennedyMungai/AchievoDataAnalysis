'use client'
import Link from 'next/link'
import React from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card'
import { Separator } from '../ui/separator'
import moment from 'moment'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '../ui/context-menu'
import axios from 'axios'
import toast from 'react-hot-toast'

type Props = {
	title: string
	link: string
	content: string
	createdAt: Date
	regionId: number
}

const RegionCardTemplate = ({
	title,
	link,
	content,
	createdAt,
	regionId
}: Props) => {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Link href={link}>
					<Card className='w-[20rem] h-[25rem] dark:hover:bg-slate-900/50 hover:bg-slate-100/50 hover:shadow-md'>
						<CardHeader>
							<CardTitle className='text-center'>
								{title}
							</CardTitle>
						</CardHeader>
						<Separator />
						<CardContent className='flex flex-1 py-3'>
							{content}
						</CardContent>
						<Separator />
						<CardFooter className='flex items-end justify-end w-full'>
							<p className='text-sm '>
								{moment(createdAt).format(
									'DD-MMM-YYYY'
								)}
							</p>
						</CardFooter>
					</Card>
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => console.log(regionId)}>
					Edit
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						axios.delete(
							`http://localhost:8000/regions/${regionId}`
						)
						toast.success('Region Successfully Deleted (Reload page to see changes)')
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RegionCardTemplate
