import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import React from "react";
import {cn} from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banners from "@/components/banners";
import {DESCRIPTION, TITLE} from "@/settings/meta";
import BackToTop from "@/components/back-to-top";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de">
        <body className={cn(inter.className, "bg-gray-900 text-white")}>
        <Banners/>
        <Header/>
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {children}
            </div>
            <BackToTop/>
        </main>
        <Footer/>
        </body>
        </html>
    );
}