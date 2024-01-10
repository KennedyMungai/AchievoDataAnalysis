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
		.min(1, 'Incident Description should be added'),
	product_name: z.string().min(1, 'Product Name should be added'),
	product_code: z.string().min(1, 'Product Code should be added'),
	product_quantity: z
		.string()
		.refine((value) => !Number.isNaN(parseInt(value, 10)), {
			message: 'Expected a number, received a string'
		}),
	product_price: z
		.string()
		.refine((value) => !Number.isNaN(parseInt(value, 10)), {
			message: 'Expected a number, received a string'
		}),
	total_value: z
		.string()
		.min(1, 'Total Value should be added')
		.refine((value) => !Number.isNaN(parseInt(value, 10)), {
			message: 'Expected a number, received a string'
		}),
	employee_id: z.string().min(1, 'The Employee Id should be added'),
	store_section_id: z.string().min(1, 'Store Section Id should be added'),
	store_id: z.string().min(1, 'The Store Id should be added'),
	region_id: z.string().min(1, 'The Region Id should be added'),
	is_resolved: z.boolean().default(false)
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
			employee_id: '',
			incident_description: '',
			is_resolved: false,
			product_code: '',
			product_name: '',
			product_price: '',
			product_quantity: '',
			region_id: '',
			store_id: '',
			store_section_id: '',
			total_value: ''
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
								<div className='w-90'>
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(
												onSubmit
											)}
											className='space-y-8'
										>
											<ScrollArea className='h-[50vh] p-5'>
												<FormField
													control={form.control}
													name='incident_description'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Incident
																Description
															</FormLabel>
															<FormDescription>
																A description of
																the incident
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Incident Description'
																	{...field}
																/>
															</FormControl>
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
															<FormDescription>
																The product Name
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Product Name'
																	{...field}
																/>
															</FormControl>
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
															<FormDescription>
																The Product Code
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Product Code'
																	{...field}
																/>
															</FormControl>
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
															<FormDescription>
																The Product
																Quantity
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Product Quantity'
																	{...field}
																/>
															</FormControl>
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
															<FormDescription>
																The Product
																Price
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Product Price'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='employee_id'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Employee Id
															</FormLabel>
															<FormDescription>
																The Id of the
																Logged In
																Employee
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Employee Id'
																	{...field}
																	disabled
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='store_section_id'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Store Section Id
															</FormLabel>
															<FormDescription>
																The Id of the
																store section
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Store Section Id'
																	{...field}
																	disabled
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='store_id'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Store Id
															</FormLabel>
															<FormDescription>
																The Id of the
																store
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Store Id'
																	{...field}
																	disabled
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='region_id'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Region Id
															</FormLabel>
															<FormDescription>
																The Id of the
																Region
															</FormDescription>
															<FormControl>
																<Input
																	placeholder='Region Id'
																	{...field}
																	disabled
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='is_resolved'
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Is Resolved
															</FormLabel>
															<FormDescription>
																A check to show
																if the issue has
																been resolved
															</FormDescription>
															<FormControl>
																<Checkbox
																	checked={
																		field.value
																	}
																	onCheckedChange={
																		field.onChange
																	}
																	disabled
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</ScrollArea>
											<Button type='submit'>
												Submit
											</Button>
										</form>
									</Form>
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
