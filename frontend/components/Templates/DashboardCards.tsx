'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
	title: string
	value: number
}

const DashboardCards = ({ title, value }: Props) => {
	return (
		<Card className='w-[20rem]'>
			<CardHeader>
				<CardTitle className='text-md text-center'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='text-center'>{value}</CardContent>
		</Card>
	)
}

export default DashboardCards
