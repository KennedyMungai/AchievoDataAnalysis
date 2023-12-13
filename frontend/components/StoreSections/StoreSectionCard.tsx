'use client'
import React from 'react'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '../ui/context-menu'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card'
import { Separator } from '../ui/separator'
import moment from 'moment'
import axios from 'axios'
import toast from 'react-hot-toast'

type Props = {
	title: string
	link: string
	content: string
	createdAt: Date
	storeSectionId: number
}

const StoreSectionCard = ({
	content,
	createdAt,
	link,
	storeSectionId,
	title
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
						{/* TODO: Add some proper formatting */}
						<CardContent className='flex flex-1 py-3'>
							{content}
						</CardContent>
						<Separator />
						<CardFooter className='flex items-end justify-end w-full'>
							<p className='text-sm '>
								{moment(createdAt).format(
									'DD-MMM-YYYY HH:mm:ss'
								)}
							</p>
						</CardFooter>
					</Card>
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => console.log(storeSectionId)}>
					Edit
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						axios.delete(
							`http://localhost:8000/store_sections/${storeSectionId}`
						)
						toast.success(
							'Region Successfully Deleted (Reload page to see changes)'
						)
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default StoreSectionCard
