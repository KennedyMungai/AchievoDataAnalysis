'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
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
import axios from 'axios'
import toast from 'react-hot-toast'
import localforage from 'localforage'

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
	store_section?: number
}

const formSchema = z.object({
	store_section: z.number().int(),
	incident_description: z
		.string()
		.min(1, 'Incident Description should be added'),
	value: z.string().transform((v) => Number(v)||0)
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
	dashboardCard4Value,
	store_section
}: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			store_section,
			incident_description: '',
			value: 0
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const bearerType = await localforage.getItem('tokenType')
		const bearerToken = await localforage.getItem('accessToken')

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
			form.setValue('value', 0)
			form.setValue('store_section', 0)
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
											<FormField
												control={form.control}
												name='incident_description'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Incident Description
														</FormLabel>
														<FormDescription>
															A description of the
															incident
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
												name='value'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Value
														</FormLabel>
														<FormDescription>
															The value of the
															incident
														</FormDescription>
														<FormControl>
															<Input
																placeholder='Incident Value'
																type='number'
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='store_section'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Store Section
														</FormLabel>
														<FormDescription>
															The store section id
														</FormDescription>
														<FormControl>
															<Input
																placeholder='Store Id'
																type='number'
																{...field}
																disabled
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<DialogFooter>
												<Button type='submit'>
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
