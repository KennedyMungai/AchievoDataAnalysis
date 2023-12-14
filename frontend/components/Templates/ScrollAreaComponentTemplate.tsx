'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

type Props = {
	title: string
    description: string
}

const ScrollAreaComponentTemplate = ({ title, description }: Props) => {
	return (
		<Card className='w-[40rem] h-full'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
		</Card>
	)
}

export default ScrollAreaComponentTemplate
