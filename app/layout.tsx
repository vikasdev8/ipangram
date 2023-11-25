import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from './_helper/storeProvider'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'IPANGRAM',
  description: 'Interview Test of I-Pangram',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#e5e7eb9c]"}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}