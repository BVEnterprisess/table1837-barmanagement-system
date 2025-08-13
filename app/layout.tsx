import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Table 1837 Bar Management System',
  description: 'Professional bar management system for Glen Rock Mill Inn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}