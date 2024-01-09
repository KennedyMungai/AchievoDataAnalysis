'use client'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import { selectSingleRegion } from '@/redux/features/regions/retrieveSingleRegionSlice'
import { selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link'
import { ReactNode } from 'react'
import TopBar from '../TopBar/TopBar'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import ChartCardTemplate from './ChartCardTemplate'
import DashboardCards from './DashboardCards'

type Props = {
	title: string
	buttonLink?: string
	buttonName: string
	dashboardCard1Value: number
	dashboardCard1Title: string
	dashboardCard2Value: number
	dashboardCard2Title: string
	dashboardCard3Value: number | string
	dashboardCard3Title: string
	chartCardTitle: string
	chartCardDescription: string
	chartCardContent: ReactNode
	scrollCardTitle: string
	scrollCardDescription: string
	scrollCardContent: ReactNode
}

const DashboardTemplate = ({
	title,
	buttonLink,
	buttonName,
	chartCardContent,
	chartCardDescription,
	chartCardTitle,
	dashboardCard1Title,
	dashboardCard1Value,
	dashboardCard2Title,
	dashboardCard2Value,
	dashboardCard3Title,
	dashboardCard3Value,
	scrollCardContent,
	scrollCardDescription,
	scrollCardTitle
}: Props) => {
	const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const regionData = useAppSelector(selectSingleRegion)
	const loginData = useAppSelector(selectAuthStateData)

	const isLoggedIn = loginData.is_logged_in

	return (
		<div className='overflow-x-hidden scrollbar-hide'>
			<TopBar pageTitle={title} />
			<div className='p-4 '>
				<div className='flex items-center justify-around'>
					{buttonLink ? (
						<Link href={buttonLink}>
							<Button variant={'outline'}>{buttonName}</Button>
						</Link>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant={'default'}
									disabled={!isLoggedIn}
								>
									{buttonName}
								</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[50rem]'>
								<DialogHeader>
									<DialogTitle className='flex justify-center uppercase'>
										Add Incident
									</DialogTitle>
									<DialogDescription className='flex justify-center font-semibold'>
										Add an incident
									</DialogDescription>
								</DialogHeader>
								<div className='w-90'>
									
								</div>
							</DialogContent>
						</Dialog>
					)}
				</div>
				<div className='p-4 flex flex-col items-center w-full gap-2 md:flex-row md:items-center md:gap-1'>
					<DashboardCards
						value={dashboardCard1Value}
						title={dashboardCard1Title}
					/>
					<DashboardCards
						value={dashboardCard2Value}
						title={dashboardCard2Title}
					/>
					<DashboardCards
						value={dashboardCard3Value}
						title={dashboardCard3Title}
					/>
				</div>
				<div className='p-4 flex gap-2 flex-col md:flex-row items-center'>
					<div className='w-[40rem] h-full rounded-lg'>
						<ChartCardTemplate
							title={chartCardTitle}
							description={chartCardDescription}
						>
							{chartCardContent}
						</ChartCardTemplate>
					</div>
					<div className='w-[40rem] h-full rounded-lg'>
						<ChartCardTemplate
							title={scrollCardTitle}
							description={scrollCardDescription}
						>
							<ScrollArea className='w-full h-[60vh] rounded-lg p-5'>
								{scrollCardContent}
							</ScrollArea>
						</ChartCardTemplate>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardTemplate
