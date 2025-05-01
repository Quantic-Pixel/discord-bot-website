export interface Command {
    name: string;
    description: string;
    categories: string[];
    parameters?: (CommandParameter | CommandParameterOptional)[];
}

interface CommandParameter {
    name: string;
    description: string;
    required: true;
    example: string;
}

interface CommandParameterOptional {
    name: string;
    description: string;
    required: false;
    example: string;
    default: string;
}

export const COMMANDS: Command[] = [
    {
        name: "/help",
        description: "Shows the help menu.",
        categories: ["General"]
    },
    {
        name: "/counting link",
        description: "Link a channel to the counting system.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to link.",
                required: true,
                example: "#counting"
            }
        ]
    },
    {
        name: "/counting set",
        description: "Set the current count.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set the count in.",
                required: true,
                example: "#counting"
            },
            {
                name: "number",
                description: "The number to set.",
                required: true,
                example: "1"
            }
        ]
    },
    {
        name: "/counting mode",
        description: "Enable or disable reset on wrong numbers.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set the mode in.",
                required: true,
                example: "#counting"
            },
            {
                name: "mode",
                description: "True or False to enable or disable reset on wrong numbers.",
                required: true,
                example: "True"
            }
        ]
    },
    {
        name: "/counting settings",
        description: "Show the settings of the current channel.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to show the settings for.",
                required: true,
                example: "#counting"
            }
        ]
    },
    {
        name: "/counting unlink",
        description: "Unlink a channel from the counting system.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to unlink.",
                required: true,
                example: "#counting"
            }
        ]
    },
    {
        name: "/counting leaderboard",
        description: "Show the leaderboard of the current channel.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to show the leaderboard for.",
                required: true,
                example: "#counting"
            },
            {
                name: "limit",
                description: "The limit of users to show in the leaderboard.",
                required: false,
                default: "10",
                example: "10"
            }
        ]
    },
    {
        name: "/counting cleanup",
        description: "Checks the last messages and deletes the ones that are not numbers.",
        categories: ["Game"],
        parameters: [
            {
                name: "channel",
                description: "The channel to clean up.",
                required: true,
                example: "#counting"
            },
            {
                name: "limit",
                description: "The limit of messages to check.",
                required: true,
                example: "100"
            }
        ]
    },
    {
        name: "/advertise link",
        description: "Set up the a channel for advertisement.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to link.",
                required: true,
                example: "#advertisement"
            },
            {
                name: "alias",
                description: "The alias for the advertisement.",
                required: true,
                example: "my_advertisement"
            }
        ]
    },
    {
        name: "/advertise unlink",
        description: "Unlink a channel from advertisement.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the advertisement to unlink.",
                required: true,
                example: "my_advertisement"
            }
        ]
    },
    {
        name: "/advertise settings",
        description: "Shows you the dialog to set advertisement settings.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the advertisement to set.",
                required: true,
                example: "my_advertisement"
            }
        ]
    },
    {
        name: "/advertise list",
        description: "Show current server advertisement settings.",
        categories: ["Admin"],
    },
    {
        name: "/advertise now",
        description: "Send advertisement now.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the advertisement to send.",
                required: true,
                example: "my_advertisement"
            }
        ]
    },
    {
        name: "/advertise get",
        description: "Show advertisement message for alias.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the advertisement to get.",
                required: true,
                example: "my_advertisement"
            }
        ]
    },
    {
        name: "/error set",
        description: "Set error channel.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as error channel.",
                required: true,
                example: "#error"
            }
        ]
    },
    {
        name: "/error remove",
        description: "Remove error channel.",
        categories: ["Admin"]
    },
    {
        name: "/error show",
        description: "show error channel.",
        categories: ["Admin"]
    },
    {
        name: "/promote set",
        description: "Set promotion channel.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as promotion channel.",
                required: true,
                example: "#promotion"
            }
        ]
    },
    {
        name: "/promote list",
        description: "List pending promotions.",
        categories: ["Admin"]
    },
    {
        name: "/promote user",
        description: "Create a new promotion.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to promote.",
                required: true,
                example: "@user"
            },
            {
                name: "current_role",
                description: "The current role of the user.",
                required: true,
                example: "Member"
            },
            {
                name: "new_role",
                description: "The new role to promote the user to.",
                required: true,
                example: "Moderator"
            },
            {
                name: "duration",
                description: "The duration of the promotion.",
                required: true,
                example: "1d"
            },
            {
                name: "keep",
                description: "Whether to keep the current role after promotion.",
                required: false,
                default: "false",
                example: "true"
            }
        ]
    },
    {
        name: "/promote channel set",
        description: "Set promotion channel.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as promotion channel.",
                required: true,
                example: "#promotion"
            }
        ]
    },
    {
        name: "/promote channel show",
        description: "Show promotion channel.",
        categories: ["Admin"]
    },
    {
        name: "/promote channel remove",
        description: "Remove promotion channel.",
        categories: ["Admin"],
    },
    {
        name: "/promote now",
        description: "Send promotion poll now.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to promote.",
                required: true,
                example: "@user"
            }
        ]
    },
    {
        name: "/promote approve",
        description: "Approve promotion.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to approve.",
                required: true,
                example: "@user"
            }
        ]
    },
    {
        name: "/promote deny",
        description: "Deny promotion.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to deny.",
                required: true,
                example: "@user"
            }
        ]
    },
    {
        name: "/promote cancel",
        description: "Cancel promotion.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to cancel.",
                required: true,
                example: "@user"
            }
        ]
    },
    {
        name: "/report user",
        description: "This will send a report into the report channel and execute the action that is defined your server settings.",
        categories: ["Admin", "Moderation"],
        parameters: [
            {
                name: "user",
                description: "The user to report.",
                required: true,
                example: "@user"
            },
            {
                name: "reason",
                description: "The reason for the report.",
                required: true,
                example: "Spamming"
            }
        ]
    },
    {
        name: "/report channel set",
        description: "Set ban report channel.",
        categories: ["Admin", "Moderation"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as ban report channel.",
                required: true,
                example: "#ban-reports"
            }
        ]
    },
    {
        name: "/report channel remove",
        description: "Remove ban report channel.",
        categories: ["Admin", "Moderation"],
    },
    {
        name: "/report channel show",
        description: "Show ban report channel.",
        categories: ["Admin", "Moderation"]
    },
    {
        name: "/giveaway channel set",
        description: "Set giveaway channel.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as giveaway channel.",
                required: true,
                example: "#giveaways"
            }
        ]
    },
    {
        name: "/giveaway channel remove",
        description: "Remove giveaway channel.",
        categories: ["Admin"]
    },
    {
        name: "/giveaway list",
        description: "List giveaways.",
        categories: ["Admin"]
    },
    {
        name: "/giveaway channel show",
        description: "Show giveaway channel.",
        categories: ["Admin"]
    },
    {
        name: "/giveaway settings",
        description: "Open the dialog to set giveaway settings.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to set.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/giveaway excluded list",
        description: "List excluded roles.",
        categories: ["Admin"]
    },
    {
        name: "/giveaway excluded addrole",
        description: "Add role to excluded.",
        categories: ["Admin"],
        parameters: [
            {
                name: "role",
                description: "The role to exclude.",
                required: true,
                example: "@excluded_role"
            }
        ]
    },
    {
        name: "/giveaway excluded removerole",
        description: "Remove role from excluded.",
        categories: ["Admin"],
        parameters: [
            {
                name: "role",
                description: "The role to include.",
                required: true,
                example: "@included_role"
            }
        ]
    },
    {
        name: "/giveaway excluded adduser",
        description: "Add user to excluded.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to exclude.",
                required: true,
                example: "@excluded_user"
            }
        ]
    },
    {
        name: "/giveaway excluded removeuser",
        description: "Remove user from excluded.",
        categories: ["Admin"],
        parameters: [
            {
                name: "user",
                description: "The user to include.",
                required: true,
                example: "@included_role"
            }
        ]
    },
    {
        name: "/giveaway start",
        description: "Start giveaway.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to start.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/giveaway end",
        description: "End giveaway.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to end.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/giveaway delete",
        description: "Delete giveaway.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to delete.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/giveaway create",
        description: "Create a new giveaway.",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to create.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/giveaway reroll",
        description: "Reroll giveaway winner(s).",
        categories: ["Admin"],
        parameters: [
            {
                name: "alias",
                description: "The alias of the giveaway to reroll.",
                required: true,
                example: "my_giveaway"
            }
        ]
    },
    {
        name: "/joinping add",
        description: "Set join ping channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "voice_channel",
                description: "The voice channel to set as join ping channel.",
                required: true,
                example: "#voice_channel"
            },
            {
                name: "text_channel",
                description: "The text channel to set as join ping channel.",
                required: true,
                example: "#text_channel"
            },
            {
                name: "role",
                description: 'The role to ping when someone joins the voice channel. Use `@everyone` to ping everyone.',
                required: true,
                example: "@moderator"
            }
        ]
    },
    {
        name: "/joinping remove",
        description: "Remove join ping channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "voice_channel",
                description: "The voice channel to remove from join ping.",
                required: true,
                example: "#voice_channel"
            }
        ]
    },
    {
        name: "/joinping list",
        description: "List join ping channels.",
        categories: ["Admin", "utility"]
    },
    {
        name: "/stats add",
        description: "Create a new stats channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "stat",
                description: "The stat to create.",
                required: true,
                example: "Total Members"
            }
        ]
    },
    {
        name: "/stats remove",
        description: "Delete a stats channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "stat",
                description: "The stat to delete.",
                required: true,
                example: "Bots"
            }
        ]
    },
    {
        name: "/join2create add",
        description: "Create a new join to create channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "voice_channel",
                description: "The voice channel to set as join to create channel.",
                required: true,
                example: "#voice_channel"
            }
        ]
    },
    {
        name: "/join2create remove",
        description: "Remove join to create channel.",
        categories: ["Admin", "utility"],
        parameters: [
            {
                name: "voice_channel",
                description: "The voice channel to remove from join to create.",
                required: true,
                example: "#voice_channel"
            }
        ]
    },
    {
        name: "/join2create list",
        description: "List join to create channels.",
        categories: ["Admin", "utility"]
    },
    {
        name: "/settings channel set",
        description: "Set the default bot channel. This is the channel where the bot will send messages by default if no channel is specified for other commands.",
        categories: ["Admin"],
        parameters: [
            {
                name: "channel",
                description: "The channel to set as default bot channel.",
                required: true,
                example: "#bot-channel"
            }
        ]
    },
    {
        name: "/settings channel remove",
        description: "Remove default bot channel.",
        categories: ["Admin"]
    },
    {
        name: "/settings channel show",
        description: "Show default bot channel.",
        categories: ["Admin"]
    },
];