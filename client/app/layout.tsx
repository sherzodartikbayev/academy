import AuthProvider from '@/components/providers/auth.provider'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { Toaster } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Academy',
  description: 'Academy'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <AuthProvider>
      <html
        lang='en'
        suppressHydrationWarning={true}
        className={cn('antialiased', geistSans.variable, spaceGrotesk.variable)}
      >
        <body className='min-h-full flex flex-col'>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            storageKey='academy-theme'
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
