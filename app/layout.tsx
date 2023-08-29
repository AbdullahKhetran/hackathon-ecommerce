import './globals.css'
import { Sora } from 'next/font/google'
import ReduxProvider from '@/redux/Provider'
import { Analytics } from '@vercel/analytics/react';

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
})


export const metadata = {
  title: 'hackathon',
  // title: 'Dine Market',
  description: 'Best Streetwear in the town',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <ReduxProvider>
          {children}
          <Analytics />
        </ReduxProvider>
      </body>

    </html>
  )
}
