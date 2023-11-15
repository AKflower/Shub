import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/sidebar/sidebar'
import Search from './components/search/search'
import HeaderBar from './components/header/HeaderBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shub',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <HeaderBar />
      <Sidebar />
      <main className='ml-60 mr-3 h-max'>
      {children}
      </main>
      
      </body>
    </html>
  )
}
