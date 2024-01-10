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
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import toast from 'react-hot-toast'
import { Checkbox } from '../ui/checkbox'

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

const formSchema = z.object({
	incident_description: z
		.string()
		.min(1, { message: 'The product name must be input' }),
	product_name: z
		.string()
		.min(1, { message: 'The product name must be input' }),
	product_code: z
		.string()
		.min(1, { message: 'The product code must be input' }),
	product_quantity: z
		.string()
		.min(1, { message: 'The product quantity must be input' }),
	product_price: z
		.string()
		.min(1, { message: 'The product price must be input' })
})

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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			incident_description: '',
			product_name: '',
			product_code: '',
			product_quantity: '',
			product_price: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		toast.success('Submitted Successfully')

		form.reset()
	}

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
								<ScrollArea className='w-90 h-80 px-5'>
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(
												onSubmit
											)}
											className='space-y-8'
										>
											<FormField
												control={form.control}
												name='incident_description'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Incident Description
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Incident Description'
																{...field}
															/>
														</FormControl>
														<FormDescription>
															A description of the
															incident
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='product_name'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Product Name
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Product Name'
																{...field}
															/>
														</FormControl>
														<FormDescription>
															The name of the
															product
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='product_code'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Product Code
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Product Code'
																{...field}
															/>
														</FormControl>
														<FormDescription>
															The code of the
															product
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='product_quantity'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Product Quantity
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Product Quantity'
																{...field}
															/>
														</FormControl>
														<FormDescription>
															The quantity of the
															product
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='product_price'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Product Price
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Product Price'
																{...field}
															/>
														</FormControl>
														<FormDescription>
															The price of the
															product
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button type='submit'>
												Submit
											</Button>
										</form>
									</Form>
								</ScrollArea>
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
