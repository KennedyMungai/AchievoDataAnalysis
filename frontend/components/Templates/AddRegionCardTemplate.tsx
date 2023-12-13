'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
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
import { ScrollArea } from '../ui/scroll-area'

type Props = {}

const formSchema = z.object({
	region_name: z.string().min(1, 'Region name is required')
})

const AddRegionCardTemplate = (props: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			region_name: ''
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post(
				'http://localhost:8000/regions',
				values
			)

			const statusCode = response.status
			toast.success('Successfully Created')
		} catch (error) {
			toast.error('Something went wrong')
		}
		
		form.reset()
		form.setValue('region_name', '')
		form.clearErrors()
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Card className='w-[20rem] h-[25rem] dark:hover:bg-slate-900/50 hover:bg-slate-100/50 hover:shadow-md'>
					<CardContent className='h-full flex flex-1 py-3 justify-center items-center'>
						<FaPlus className='text-8xl text-slate-500' />
					</CardContent>
				</Card>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className='pb-5'>
					<SheetTitle className='uppercase text-center'>
						Create Region
					</SheetTitle>
					<SheetDescription className='font-semibold uppercase text-center'>
						Create a new region
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
									name='region_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Region Name</FormLabel>
											<FormDescription>
												Add the region name
											</FormDescription>
											<FormControl>
												<Input
													placeholder='Region Name'
													{...field}
												/>
											</FormControl>
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
	)
}

export default AddRegionCardTemplate
