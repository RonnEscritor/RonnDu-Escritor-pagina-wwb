import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Pinyon_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RonnDu | Autor Independiente',
  description: 'Descubre las obras de RonnDu, un autor independiente con narrativa que desafía lo convencional. Compra libros digitales directamente del autor.',
  keywords: ['RonnDu', 'autor independiente', 'libros digitales', 'narrativa contemporánea', 'ebooks'],
  authors: [{ name: 'RonnDu' }],
  openGraph: {
    title: 'RonnDu | Autor Independiente',
    description: 'Narrativa que desafía lo convencional. Descubre y compra libros digitales directamente del autor.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RonnDu | Autor Independiente',
    description: 'Narrativa que desafía lo convencional.',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${playfair.variable} ${inter.variable} ${pinyonScript.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
