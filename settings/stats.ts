import {Bot, LucideIcon, ServerIcon, UsersIcon} from "lucide-react";

export interface Stat {
    title: string;
    value: number;
    Icon: LucideIcon;
    suffix?: string;
    loader?: () => Promise<number>;
}

export const STATS: Stat[] = [
    {
        title: "Members",
        value: 99,
        Icon: UsersIcon,
        suffix: "+",
        loader: async () => {
            const apiResult = await fetch(`https://discord.com/api/v10/invites/24Zf3y2sRT?with_counts=true&with_expiration=true`, {
                next: {revalidate: 3600}
            })
            const data = await apiResult.json()
            const members = data.approximate_member_count || 1;
            return Math.floor(members / 10) * 10;
        }
    },
    {
        title: "Installed Servers",
        value: 1,
        Icon: Bot,
    },
    {
        title: "Developers",
        value: 5,
        Icon: ServerIcon,
    },
];