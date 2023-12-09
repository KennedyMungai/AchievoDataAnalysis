'use client'
import React from 'react'
import LoginButton from './LoginForm'

type Props = {
	pageTitle: string
}

const TopBar = ({pageTitle}: Props) => {
	return (
		<div className='h-[3rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-between p-3 border-b-[1px] border-slate-300 dark:border-slate-500'>
			<div className='font-semibold text-2xl uppercase'>{pageTitle}</div>
			<div className=''>
				<LoginButton />
			</div>
		</div>
	)
}

export default TopBar
