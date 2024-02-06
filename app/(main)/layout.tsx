import type {Metadata} from "next";
import {Inter} from "next/font/google";
import '../globals.css'
import React from "react";

const inter = Inter({subsets: ["latin"]});


import Navbar from "@/components/landingPage/navbar";

export const metadata: Metadata = {
    title: 'Pocket Notion',
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
export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Navbar/>
        <div className="mt-40">
            {children}
        </div>
        </body>
        </html>
    );
}
