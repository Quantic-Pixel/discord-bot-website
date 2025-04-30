import Link from "next/link";
import {Bot} from "lucide-react";
import {SOCIALS} from "@/settings/socials";
import React from "react";

const Header = () => {
    return <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Bot className="h-8 w-8 text-purple-500"/>
                        <span className="text-white font-semibold">Quantic Discord Bot</span>
                    </Link>
                    <div className="hidden md:flex ml-8 space-x-4">
                        <Link
                            href="/commands"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Bot Commands
                        </Link>
                        <Link
                            href="/faq"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href={SOCIALS.website.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Quantic Pixel Website
                    </Link>
                    <Link
                        href={SOCIALS.github.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Github
                    </Link>
                    <Link
                        href={SOCIALS.discord.link}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                        Join Discord Server
                    </Link>
                </div>
            </div>
        </nav>
    </header>

}

export default Header;