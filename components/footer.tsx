import Link from "next/link";
import {SOCIALS} from "@/settings/socials";
import React from "react";
import {FolderGit2} from "lucide-react";

const Footer = () => {
    return <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">About</h3>
                    <p className="text-gray-400">
                        The Quantic Discord Bot is designed to enhance your Discord server experience with a variety of features and commands. Whether you&#39;re looking for moderation tools, fun commands, or utility features, Quantic has you covered.
                    </p>
                    <p className="text-gray-400 mt-4">
                        <Link href={SOCIALS.github.link} target="_blank" rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors">
                            <FolderGit2 className="inline-block mr-1"/>
                        </Link>
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href={SOCIALS.website.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Quantic Pixel Website
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/commands"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                View Commands
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={SOCIALS.discord.link}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Join Discord Server
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Quantic Pixel. All rights reserved.</p>
            </div>
        </div>
    </footer>
}

export default Footer;