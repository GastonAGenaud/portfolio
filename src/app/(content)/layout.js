/* eslint-disable react/prop-types */
import '../globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio',
  description: 'Gaston Genaud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
