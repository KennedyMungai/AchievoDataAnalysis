'use client'
import { selectAuthStateData } from '@/redux/features/auth/authSlice'
import { selectSingleRegion } from '@/redux/features/regions/retrieveSingleRegionSlice'
import { selectSingleStoreSection } from '@/redux/features/storeSections/retrieveSingleStoreSectionSlice'
import { selectSingleStore } from '@/redux/features/stores/retrieveSingleStoreSlice'
import { useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '../ui/separator'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '../ui/sheet'
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

const employeeFormSchema = z.object({
	employee_name: z.string().min(1, { message: 'The name must be input' }),
	employee_email: z.string().min(1, { message: 'The email must be input' }),
	employee_phone_number: z
		.string()
		.min(1, { message: 'The phone number must be input' }),
	employee_job_title: z
		.string()
		.min(1, { message: 'The job title must be input' }),
	employee_password: z
		.string()
		.min(1, { message: 'The password must be input' })
	// TODO: Implement confirm password field
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

	const employeeForm = useForm<z.infer<typeof employeeFormSchema>>({
		resolver: zodResolver(employeeFormSchema),
		defaultValues: {
			employee_name: '',
			employee_email: '',
			employee_phone_number: '',
			employee_job_title: '',
			employee_password: ''
		}
	})

	async function onSubmit({
		incident_description,
		product_code,
		product_name,
		product_price: product_price_string,
		product_quantity: product_quantity_string
	}: z.infer<typeof formSchema>) {
		const submittedValues = {
			incident_description,
			product_name,
			product_code,
			product_quantity: Number(product_quantity_string),
			product_price: Number(product_price_string),
			total_value:
				Number(product_quantity_string) * Number(product_price_string),
			store_section_id: storeSectionData.store_section_id,
			employee_id: loginData.employee_id,
			store_id: storeData.store_id,
			region_id: regionData.region_id
		}

		try {
			await axios.post('http://localhost:8000/incidents', submittedValues)
			toast.success('Incident Successfully Submitted')
		} catch (error: any) {
			toast.error(error.message)
		}

		form.reset()
	}

	async function onEmployeeSubmit({
		employee_name,
		employee_email,
		employee_phone_number,
		employee_job_title,
		employee_password
	}: z.infer<typeof employeeFormSchema>) {
		const valuesToSubmit = {
			employee_name,
			employee_email,
			employee_phone_number,
			employee_job_title,
			store_id: storeData.store_id,
			region_id: regionData.region_id,
			employee_password
		}

		try {
			await axios.post('http://localhost:8000/employees', valuesToSubmit)
			toast.success('Employee Successfully Created')
		} catch (error: any) {
			toast.error(error.message)
		}

		employeeForm.reset()
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
						<>
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
																Incident
																Description
															</FormLabel>
															<FormControl>
																<Input
																	placeholder='Incident Description'
																	{...field}
																/>
															</FormControl>
															<FormDescription>
																A description of
																the incident
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
																The quantity of
																the product
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
							<Sheet>
								<SheetTrigger asChild>
									<Button variant={'outline'}>
										Add Employee
									</Button>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Add an Employee</SheetTitle>
										<SheetDescription>
											This is a form used to create a new
											employee
										</SheetDescription>
									</SheetHeader>
									<Separator className='my-3' />
									<ScrollArea>
										<div className='w-full h-80'>
											<Form {...employeeForm}>
												<form
													onSubmit={employeeForm.handleSubmit(
														onEmployeeSubmit
													)}
													className='space-y-8'
												>
													<FormField
														control={
															employeeForm.control
														}
														name='employee_name'
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Employee
																	Name
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Employee Name'
																		{...field}
																	/>
																</FormControl>
																<FormDescription>
																	Please input
																	the employee
																	Name
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={
															employeeForm.control
														}
														name='employee_email'
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Employee
																	Email
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Employee Email'
																		{...field}
																	/>
																</FormControl>
																<FormDescription>
																	Please input
																	the Employee
																	Email
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={
															employeeForm.control
														}
														name='employee_phone_number'
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Employee
																	Phone Number
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Employee Phone Number'
																		{...field}
																	/>
																</FormControl>
																<FormDescription>
																	Please input
																	the Employee
																	Phone Number
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={
															employeeForm.control
														}
														name='employee_job_title'
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Employee Job
																	Title
																</FormLabel>
																<FormControl>
																	<Select onValueChange={field.onChange} defaultValue={field.value}>
																		<SelectTrigger className='w-[180px]'>
																			<SelectValue placeholder='Select Job Title' />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectGroup>
																				<SelectLabel className='uppercase text-center'>Job Titles</SelectLabel>
																				<Separator />
																				{/* TODO: Add some role based selective rendering */}
																				<SelectItem value='administrator'>Administrator</SelectItem>
																				<SelectItem value='area_manager'>Area Manager</SelectItem>
																				<SelectItem value='lcm'>LCM</SelectItem>
																				<SelectItem value='fec'>FEC</SelectItem>
																				<SelectItem value='cro'>CRO</SelectItem>
																				<SelectItem value='dc'>DC</SelectItem>
																				<SelectItem value='receiving_clerk'>Receiving Clerk</SelectItem>
																			</SelectGroup>
																		</SelectContent>
																	</Select>
																</FormControl>
																<FormDescription>
																	Please input
																	the Employee
																	Job Title
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={
															employeeForm.control
														}
														name='employee_password'
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Employee
																	Password
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Employee Password'
																		type='password'
																		{...field}
																	/>
																</FormControl>
																<FormDescription>
																	Please input
																	the Employee
																	Password
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>
													<SheetFooter className='fixed bottom-0 right-0 p-3'>
														<SheetClose asChild>
															<Button type='submit'>
																Save Changes
															</Button>
														</SheetClose>
													</SheetFooter>
												</form>
											</Form>
										</div>
									</ScrollArea>
								</SheetContent>
							</Sheet>
						</>
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
