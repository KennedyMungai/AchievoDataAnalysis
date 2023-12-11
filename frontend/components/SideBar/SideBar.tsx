'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { IoStorefrontOutline } from 'react-icons/io5'
import { SlMap } from 'react-icons/sl'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { Separator } from '../ui/separator'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '../ui/tooltip'
import { ThemeToggle } from './ThemeToggle'

type Props = {}

const SideBar = (props: Props) => {
	return (
		<nav className='w-[6rem] h-screen flex flex-col justify-between border-r-[1px] dark:border-slate-500 border-slate-300 p-5 fixed bg-slate-50 dark:bg-slate-900 fixed'>
			<div className=''>
				<div className='hover:bg-slate-200 p-1 rounded-md mb-3 dark:hover:bg-slate-700'>
					<Link href={'/'}>
						<Image
							src={'/images/Achievo_A.png'}
							alt='Achievo Logo'
							width={60}
							height={60}
							loading='lazy'
						/>
					</Link>
				</div>
				<Separator />
			</div>

			<div className='flex flex-col justify-around h-full py-20'>
				<Link href={'/regions'}>
					<div className='text-3xl p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center rounded-md'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<SlMap />
								</TooltipTrigger>
								<TooltipContent>Regions</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</Link>
				<Link href={'/employees'}>
					<div className='text-3xl p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center rounded-md'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<BsPerson />
								</TooltipTrigger>
								<TooltipContent>Employees</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</Link>
			</div>
			<div className=''>
				<ThemeToggle />
			</div>
		</nav>
	)
}

export default SideBar