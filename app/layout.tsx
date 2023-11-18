import 'app/globals.css'
import type { Metadata } from 'next'
import { NextAuthProvider } from '../app/Providers';


export const metadata: Metadata = {
  title: 'Namma Bengaluru',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
        {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}