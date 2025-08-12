import Head from 'next/head'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = 'Table 1837 - Bar Management System' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="bg-black text-white min-h-screen font-garamond">
        {children}
      </div>
    </>
  )
}