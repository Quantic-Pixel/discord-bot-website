import Link from "next/link";
import {Command, PlayCircle} from "lucide-react";
import {SOCIALS} from "@/settings/socials";

const Join = () => {
    return (
        <div className="mt-20">
            <div
                className="bg-purple-600/20 rounded-lg p-8 text-center backdrop-blur-sm border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Are you ready to enhance your discord server experience?
                </h2>
                <p className="text-gray-300 mb-8">
                    To learn more about the bot and its features, join our Discord server.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/commands"
                        className="inline-flex items-center px-6 py-3 bg-white text-purple-600 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                    >
                        View Commands
                        <Command className="ml-2 h-5 w-5"/>
                    </Link>
                    <Link
                        href={SOCIALS.discord.link}
                        className="inline-flex items-center px-6 py-3 border border-white text-white text-base font-medium rounded-md hover:bg-white/20 transition-colors"
                    >
                        Join Discord Server
                        <PlayCircle className="ml-2 h-5 w-5"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join;