'use client'
import React, { ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../ui/card'

type Props = {
	title: string
	description: string
	children: ReactNode
}

const ChartCardTemplate = ({ title, description, children }: Props) => {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}

export default ChartCardTemplate
