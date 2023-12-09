'use client'
import React, { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type Props = {
	children: ReactNode
}

const ThemeProvider = ({ children }: Props) => {
	return <NextThemesProvider attribute='class' enableSystem defaultTheme='system'>{children}</NextThemesProvider>
}

export default ThemeProvider