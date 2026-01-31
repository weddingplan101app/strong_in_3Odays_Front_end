import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Inter, Geist_Mono as V0_Font_Geist_Mono, Lora as V0_Font_Lora } from "next/font/google"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { Toaster } from "@/components/ui/toaster"

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const _lora = V0_Font_Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

// Using Inter font for modern, clean fitness brand aesthetic
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Strong in 30 - Nigerian Fitness Platform",
  description: "30-day fitness programs with short workout videos. Get stronger in just 30 seconds per day.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning={true} className={`${inter.className} font-sans antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
