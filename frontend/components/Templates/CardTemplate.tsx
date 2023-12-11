'use client'

import moment from 'moment'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card'
import { Separator } from '../ui/separator'

type Props = {
	title: string
	link: string
	content: string
	createdAt: Date
}

const CardTemplate = ({ title, link, content, createdAt }: Props) => {
	return (
		<Link href={link}>
			<Card className='w-[20rem] h-[25rem] dark:hover:bg-slate-900/50 hover:bg-slate-100/50 hover:shadow-md'>
				<CardHeader>
					<CardTitle className='text-center'>{title}</CardTitle>
				</CardHeader>
				<Separator />
				{/* TODO: Add some proper formatting */}
				<CardContent className='flex flex-1 py-3'>
					{content}
				</CardContent>
				<Separator />
				<CardFooter className='flex items-end justify-end w-full'>
					<p className='text-sm '>
						{moment(createdAt).format('DD-MMM-YYYY HH:mm:ss')}
					</p>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default CardTemplate
