'use client'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from '../ui/context-menu'
import { Separator } from '../ui/separator'
import { ReactNode } from 'react'

type Props = {
	title: string
	link: string
	content: ReactNode
	createdAt: Date
	storeId: number
}

const StoreCardTemplate = ({
	content,
	createdAt,
	link,
	storeId,
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
						<CardContent className='flex flex-1 py-20 items-center justify-center'>
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
				<ContextMenuItem onClick={() => console.log(storeId)}>
					Edit
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						axios.delete(`http://localhost:8000/stores/${storeId}`)
						toast.success(
							'Store Successfully Deleted (Reload page to see changes)'
						)
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default StoreCardTemplate
