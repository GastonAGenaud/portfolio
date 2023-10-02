/* eslint-disable react/prop-types */
import '../globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio - Gaston Genaud',
  description: 'Gaston Genaud',
  icon: '/images/favicon.ico',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <link rel="icon" href={metadata.icon} />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
