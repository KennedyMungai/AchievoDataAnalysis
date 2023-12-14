'use client'
import React from 'react'

type Props = {
	title: string
}

const ScrollAreaComponentTemplate = ({ title }: Props) => {
	return (
		<div className='w-[40rem]'>
			<div className='text-center uppercase font-semibold'>{title}</div>
			{}
		</div>
	)
}

export default ScrollAreaComponentTemplate
