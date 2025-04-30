import {Bot, ServerIcon, UsersIcon} from "lucide-react";


async function getServerMembers(server_id: number): Promise<number> {

    return 0
}

// Math.floor(getServerMembers(1254460920084562090).then() / 10) * 10 + "+"

export const STATS = [
    {
        title: "Active Users",
        value: "200+",
        icon: UsersIcon,
    },
    {
        title: "Installed Servers",
        value: "1",
        icon: Bot,
    },
    {
        title: "Developers",
        value: "5",
        icon: ServerIcon,
    },
];

