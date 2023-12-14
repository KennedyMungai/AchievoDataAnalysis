'use client'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import { selectSingleRegion } from '@/redux/features/regions/retrieveSingleRegionSlice'
import { selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import localforage from 'localforage'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import TopBar from '../TopBar/TopBar'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
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
	dashboardCard3Value: number
	dashboardCard3Title: string
	dashboardCard4Value: number
	dashboardCard4Title: string
	chartCardTitle: string
	chartCardDescription: string
	chartCardContent: ReactNode
	scrollAreaComponent: ReactNode
}

const formSchema = z.object({
	incident_description: z
		.string()
		.min(1, 'Incident Description should be added'),
	product_name: z.string().min(1, 'Product Name should be added'),
	product_code: z.string().min(1, 'Product Code should be added'),
	product_quantity: z
		.string()
		.min(1, 'Product Quantity should be added')
		.refine((value) => !Number.isNaN(parseInt(value, 10)), {
			message: 'Expected a number, received a string'
		}),
	product_price: z
		.string()
		.min(1, 'Product Price should be added')
		.refine((value) => !Number.isNaN(parseInt(value, 10)), {
			message: 'Expected a number, received a string'
		}),
	employee_id: z.string().min(1, 'The Employee Id should be added'),
	store_section_id: z.string().min(1, 'Store Section Id should be added'),
	store_id: z.string().min(1, 'The Store Id should be added'),
	region_id: z.string().min(1, 'The Region Id should be added')
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
	scrollAreaComponent,
	dashboardCard2Title,
	dashboardCard2Value,
	dashboardCard3Title,
	dashboardCard3Value,
	dashboardCard4Title,
	dashboardCard4Value
}: Props) => {
	const storeSectionData = useAppSelector(selectSingleStoreSection)
	const storeData = useAppSelector(selectSingleStore)
	const regionData = useAppSelector(selectSingleRegion)
	const isLoggedIn = useAppSelector(selectAuthStateData).is_logged_in

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			incident_description: '',
			product_name: '',
			product_code: '',
			product_quantity: '',
			product_price: '',
			employee_id: String(localforage.getItem("employeeId")),
			store_section_id: String(storeSectionData.store_section_id),
			store_id: String(storeData.store_id),
			region_id: String(regionData.region_id)
		}
	})

	const onSubmit = async ({
		incident_description,
		product_code,
		product_name,
		product_price,
		product_quantity,
		region_id,
		store_id,
		store_section_id
	}: z.infer<typeof formSchema>) => {
		const bearerType = await localforage.getItem('tokenType')
		const bearerToken = await localforage.getItem('accessToken')

		const values = {
			incident_description,
			product_name,
			product_code,
			product_quantity: Number(product_quantity),
			product_price: Number(product_price),
			store_section_id: Number(store_section_id),
			store_id: Number(store_id),
			region_id: Number(region_id),
			employeeId: Number(employeeId)
		}

		console.log(values)

		try {
			const response = await axios.post(
				'http://localhost:8000/incidents',
				values,
				{
					headers: {
						Authorization: `${bearerType} ${bearerToken}`
					}
				}
			)

			toast.success('Incident Successfully Created')

			form.reset()
			form.setValue('incident_description', '')
			form.setValue('product_name', '')
			form.setValue('product_code', '')
			form.setValue('product_quantity', '')
			form.setValue('product_price', '')
			form.clearErrors()
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<div>
			<TopBar pageTitle={title} />
			<div className='p-4 '>
				<div className='flex items-center justify-center'>
					{buttonLink ? (
						<Link href={buttonLink}>
							<Button variant={'default'}>{buttonName}</Button>
						</Link>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button variant={'default'}>
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
											className='w-full'
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
																Logged In Employee
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
											</ScrollArea>
											<DialogFooter>
												<Button
													type='submit'
													disabled={!isLoggedIn}
												>
													Save Changes
												</Button>
											</DialogFooter>
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
					<DashboardCards
						value={dashboardCard4Value}
						title={dashboardCard4Title}
					/>
				</div>
				<div className='p-4 flex gap-2'>
					{/* TODO: Add the Charts */}
					<div className='w-[40rem] h-[20rem] bg-orange-500 rounded-lg'>
						<ChartCardTemplate
							title={chartCardTitle}
							description={chartCardDescription}
						>
							{chartCardContent}
						</ChartCardTemplate>
					</div>
					{/* TODO: Add a list of the most valuable incidents */}
					<ScrollArea className='bg-orange-500 w-[40rem] rounded-lg'>
						{scrollAreaComponent}
					</ScrollArea>
				</div>
			</div>
		</div>
	)
}

export default DashboardTemplate
