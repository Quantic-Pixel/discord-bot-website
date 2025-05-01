import {SOCIALS} from "@/settings/socials";

export interface Banner {
    title: string;
    link?: string;
    linkText?: string;
    color: "red" | "green" | "blue" | "yellow" | "purple" | "pink" | "gray"
}

export const BANNERS: Banner[] = [
    {
        title: "🧑‍💻 The bot is currently in development. You can join our Discord server to get insights and updates.",
        link: SOCIALS.discord.link,
        linkText: "Join Discord Server",
        color: "purple",
    }
]