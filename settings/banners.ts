export interface Banner {
    title: string;
    link?: string;
    linkText?: string;
    color: "red" | "green" | "blue" | "yellow" | "purple" | "pink" | "gray"
}

export const BANNERS: Banner[] = [
    {
        title: "🧑‍💻 The bot is currently in development. You can join our Discord server to get insights and updates.",
        link: "https://discord.gg/quantic",
        linkText: "Join Discord Server",
        color: "purple",
    }
]