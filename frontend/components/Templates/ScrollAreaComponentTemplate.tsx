'use client'
import React, { ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'

type Props = {
	title: string
	description: string
	content: ReactNode
}

const ScrollAreaComponentTemplate = ({ title, description, content }: Props) => {
	return (
		<Card className='w-[40rem] h-full mr-10'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className='h-[30vh] bg-slate-400 dark:bg-slate-600 rounded-lg p-2 m-2'>
					{content}
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

export default ScrollAreaComponentTemplate
