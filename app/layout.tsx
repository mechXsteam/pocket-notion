import {Inter} from 'next/font/google'
import type {Metadata} from 'next'


import './globals.css'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Jotion',
    description: 'The connected workspace where better, faster work happens.',
    icons: {
        icon: [
            {
                url: "/notion.svg",
                href: "/notion.svg",
            }
        ]
    }
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning >
        <body className={inter.className}>
        <div className="mt-40">
            {children}
        </div>
        </body>
        </html>
    )
}