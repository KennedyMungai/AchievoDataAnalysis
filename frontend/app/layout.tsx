import SideBar from '@/components/SideBar/SideBar'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import ThemeProvider from '@/providers/ThemeProvider'
import ReduxProvider from '@/providers/ReduxProvider'

const open_sans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Achievo Data Analysis',
	description: 'Achievo Loss Control Data Analysis App'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={open_sans.className}>
				<ReduxProvider>
					<ThemeProvider>
						<Toaster
							position='top-center'
							toastOptions={{
								duration: 5000,
								style: {
									backgroundColor: '#708090',
									color: 'white'
								}
							}}
						/>
						<SideBar />
						{children}
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
