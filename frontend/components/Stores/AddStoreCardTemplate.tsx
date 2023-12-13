'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
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
import { Card, CardContent } from '../ui/card'
import { FaPlus } from 'react-icons/fa'
import { ScrollArea } from '../ui/scroll-area'
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
import { Button } from '../ui/button'
import axios from 'axios'

type Props = {
	regionId: number
}

const formSchema = z.object({
	region_id: z.number().int(),
	store_name: z.string().min(1, 'The name of the store must be entered'),
	store_location: z.string().min(1, 'The store address must be entered')
})

const AddStoreCardTemplate = ({ regionId }: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			region_id: regionId,
			store_name: '',
			store_location: ''
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await axios.post(
			'http://localhost:8000/stores',
			values
		)

		const statusCode = response.status

		if (statusCode === 201) {
			toast.success('Successfully Created')
			// window.location.reload()
		} else {
			toast.error('Something went wrong')
		}

		form.reset()
		form.setValue('store_location', '')
		form.setValue('store_name', '')
		form.clearErrors()
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Card className='w-[20rem] h-[25rem] dark:hover:bg-slate-900/50 hover:bg-slate-100/50'>
					<CardContent className='h-full flex flex-1 py-3 justify-center items-center'>
						<FaPlus className='text-8xl text-slate-500' />
					</CardContent>
				</Card>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='uppercase text-center'>
						Create Store
					</SheetTitle>
					<SheetDescription className='font-semibold uppercase text-center'>
						Create a new store
					</SheetDescription>
				</SheetHeader>
				<ScrollArea className='h-[70vh] w-full rounded-md border p-4'>
					<div className='w-full h-80'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-7'
							>
								<FormField
									control={form.control}
									name='store_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Name</FormLabel>
											<FormDescription>
												Add the store name
											</FormDescription>
											<FormControl>
												<Input
													placeholder='Store Name'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='store_location'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Address</FormLabel>
											<FormDescription>
												Add the store address
											</FormDescription>
											<FormControl>
												<Input
													placeholder='Store Address'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* TODO: Find a way to solve this */}
								<FormField
									control={form.control}
									name='region_id'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Region Id</FormLabel>
											<FormDescription>
												The Id of the region
											</FormDescription>
											<FormControl>
												<Input
													placeholder='Region ID'
													{...field}
													disabled={true}
												/>
											</FormControl>
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
	)
}

export default AddStoreCardTemplate
