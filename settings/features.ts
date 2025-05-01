import {Bot, CircleDollarSign, LucideIcon, Milestone, SquarePen, Zap} from "lucide-react";

export interface Feature {
    title: string;
    description: string;
    Icon: LucideIcon;
}

export const FEATURES: Feature[] = [
    {
        title: "Everything in one place",
        description: "No need to add multiple bots to your server. We have everything you need.",
        Icon: Bot,
    },
    {
        title: "Easy to use",
        description: "Our bot is easy to use and has a simple setup process and a web dashboard.",
        Icon: Milestone,
    },
    {
        title: "Fast and responsive",
        description: "Our bot is fast and responsive, with low latency and high uptime.",
        Icon: Zap,
    },
    {
        title: "Customizable",
        description: "You can customize the bot to fit your server's needs.",
        Icon: SquarePen,
    },
    {
        title: "Generous free tier",
        description: "We have a generous free tier, so you can use the bot without paying anything.",
        Icon: CircleDollarSign,
    }
]
