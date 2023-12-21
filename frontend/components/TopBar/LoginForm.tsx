'use client'
import {
	getAuthToken,
	logIn,
	logOut,
	selectAuthStateData
} from '@/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
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

type Props = {}

const formSchema = z.object({
	userEmail: z.string().email().min(1, 'Email is required'),
	password: z.string().min(1, 'Password is required')
})

const LoginButton = (props: Props) => {
	// TODO: Recheck the logic used to authenticate users

	const dispatch = useAppDispatch()
	const { employee_name, is_logged_in: isLoggedIn } =
		useAppSelector(selectAuthStateData)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userEmail: '',
			password: ''
		}
	})

	const onSubmit = async ({
		userEmail,
		password
	}: z.infer<typeof formSchema>) => {
		try {
			dispatch(
				getAuthToken({
					employee_email: userEmail,
					employee_password: password
				})
			)
			dispatch(logIn())
			toast.success('Successfully Logged in')
		} catch (error) {
			toast.error('Something went wrong')
		}

		form.reset()
		form.setValue('userEmail', '')
		form.setValue('password', '')
		form.clearErrors()
	}

	const logOutHandler = () => {
		dispatch(logOut())

		toast.success('Successfully Logged out')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant={'outline'}>
					Welcome Back {employee_name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem className='flex justify-center'>
					<Button variant={'destructive'} onClick={logOutHandler}>
						Logout
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LoginButton
