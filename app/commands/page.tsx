"use client";

import {Command, COMMANDS} from "@/settings/commands";
import {useMemo, useState} from "react";
import {Check, Copy, Terminal} from "lucide-react";
import {cn} from "@/lib/utils";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

// Define a type for the grouped structure
type CommandGroups = {
    [groupName: string]: Command[];
};

// Helper function to group commands
const groupCommands = (commands: Command[]): CommandGroups => {
    const groups: CommandGroups = {};
    commands.forEach((cmd) => {
        // Group by the first word (e.g., "/counting" or "!role")
        const groupKey = cmd.name.split(" ")[0];
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(cmd);
    });

    // Optional: Sort commands within each group and sort the groups by key
    const sortedGroupKeys = Object.keys(groups).sort();
    const sortedGroups: CommandGroups = {};
    sortedGroupKeys.forEach(key => {
        sortedGroups[key] = groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });

    return sortedGroups;
};

export default function CommandsPage() {
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // New state for selected groups
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);


    const copyCommand = (command: string) => {
        navigator.clipboard.writeText(command).then((r) => r);
        setCopiedCommand(command);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    // Get unique categories from all commands
    const allCategories = useMemo(
        () => Array.from(new Set(COMMANDS.flatMap((cmd) => cmd.categories))).sort(), // Sort categories
        []
    );

    // Get unique group names from all commands
    const allGroupNames = useMemo(() => {
        const groups: { [key: string]: boolean } = {};
        COMMANDS.forEach(cmd => {
            const groupKey = cmd.name.split(" ")[0];
            groups[groupKey] = true;
        });
        return Object.keys(groups).sort(); // Get keys and sort them
    }, []);


    // Filter commands based on search, categories, AND groups
    const filteredCommands = useMemo(() => {
        return COMMANDS.filter((cmd) => {
            const matchesSearch =
                cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.description.toLowerCase().includes(searchTerm.toLowerCase()); // Also search description

            const matchesCategories =
                selectedCategories.length === 0 ||
                cmd.categories.some((cat) => selectedCategories.includes(cat));

            // New filter criteria: check if the command's group is in the selected groups
            const commandGroup = cmd.name.split(" ")[0];
            const matchesGroups =
                selectedGroups.length === 0 ||
                selectedGroups.includes(commandGroup);

            return matchesSearch && matchesCategories && matchesGroups;
        });
    }, [searchTerm, selectedCategories, selectedGroups]); // Add selectedGroups to dependencies

    // Group the filtered commands
    const groupedAndFilteredCommands = useMemo(() => {
        const slashCommands = filteredCommands.filter((cmd) =>
            cmd.name.startsWith("/")
        );
        const prefixCommands = filteredCommands.filter((cmd) =>
            cmd.name.startsWith("!")
        );

        return {
            slashGroups: groupCommands(slashCommands),
            prefixGroups: groupCommands(prefixCommands),
        };
    }, [filteredCommands]); // Depends on filteredCommands


    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // New function to toggle group selection
    const toggleGroup = (groupName: string) => {
        setSelectedGroups((prev) =>
            prev.includes(groupName)
                ? prev.filter((g) => g !== groupName)
                : [...prev, groupName]
        );
    };


    const hasSlashCommands =
        Object.keys(groupedAndFilteredCommands.slashGroups).length > 0;
    const hasPrefixCommands =
        Object.keys(groupedAndFilteredCommands.prefixGroups).length > 0;

    return (
        <main className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div
                        className="flex justify-center flex-col"
                    >
                        <div className="flex justify-center mb-8">
                            <Terminal className="h-20 w-20 text-purple-500"/>
                        </div>
                        <div
                            className={`flex justify-center`}
                        >
                            <h1 className="text-4xl font-bold text-white mb-4">Bot Commands</h1>
                            <span
                                className="inline-block bg-purple-500/20 h-fit mt-1 text-purple-300 font-semibold px-2 py-1 rounded-md ml-2">
                                {COMMANDS.length}
                            </span>
                        </div>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        This is a list of all available commands for the bot. You can search for commands, filter by
                        categories, and view examples of how to use them.
                    </p>
                </div>

                <div className="mb-8 space-y-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Seach for commands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />

                    {/* Category Filters */}
                    <div
                        className={"flex gap-4"}
                    >
                        <div>
                            <p className="text-gray-400 text-sm mb-2">
                                Categories
                                {selectedCategories.length > 0 && (
                                    <button
                                        onClick={() => setSelectedCategories([])}
                                        className="text-xs transition-colors text-red-500 ml-2 hover:text-red-700"
                                    >
                                        Delete all filters
                                    </button>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {allCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => toggleCategory(category)}
                                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                            selectedCategories.includes(category)
                                                ? "bg-purple-500 text-white"
                                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}

                            </div>
                        </div>

                        {/* New: Group Filters */}
                        <div>
                            <p className="text-gray-400 text-sm mb-2">
                                Groups
                                {selectedGroups.length > 0 && (
                                    <button
                                        onClick={() => setSelectedGroups([])}
                                        className="text-xs transition-colors text-red-500 ml-2 hover:text-red-700"
                                    >
                                        Delete all filters
                                    </button>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedGroups(
                                        allGroupNames.filter(groupName =>
                                            COMMANDS.filter(cmd => cmd.name.startsWith(groupName)).length === 1
                                        )
                                    )}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors bg-amber-500/20 text-amber-300 hover:bg-amber-500/30`}
                                >
                                    Show unique commands
                                </button>
                                {allGroupNames
                                    .filter(groupName => {
                                        const commandCount = COMMANDS.filter(cmd => cmd.name.startsWith(groupName)).length;
                                        return commandCount > 1;
                                    })
                                    .map((groupName) => (
                                        <button
                                            key={groupName}
                                            onClick={() => toggleGroup(groupName)}
                                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                                selectedGroups.includes(groupName)
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                                            }`}
                                        >
                                            {groupName}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slash Commands Section */}
                {hasSlashCommands && (
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            Slash Commands{" "}
                            <span
                                className="inline-block bg-purple-500/20 text-purple-300 text-sm px-2 py-1 rounded-md">
                                /
                            </span>
                            <span
                                className="inline-block bg-purple-500/20 text-purple-300 text-sm px-2 py-1 rounded-md">
                                {
                                    Object.keys(groupedAndFilteredCommands.slashGroups)
                                        .map(groupName => groupedAndFilteredCommands.slashGroups[groupName])
                                        .flat()
                                        .map(cmd => cmd.name).length
                                }
                            </span>
                        </h2>
                        <CommandsList
                            groups={groupedAndFilteredCommands.slashGroups}
                            copyCommand={copyCommand}
                            copiedCommand={copiedCommand}
                        />
                    </div>
                )}

                {/* Prefix Commands Section */}
                {hasPrefixCommands && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            Prefix Commands{" "}
                            <span
                                className="inline-block bg-purple-500/20 text-purple-300 text-sm px-2 py-1 rounded-md">
                                !
                            </span>
                            <span
                                className="inline-block bg-purple-500/20 text-purple-300 text-sm px-2 py-1 rounded-md">
                                {
                                        Object.keys(groupedAndFilteredCommands.prefixGroups)
                                            .map(groupName => groupedAndFilteredCommands.prefixGroups[groupName])
                                            .flat()
                                            .map(cmd => cmd.name).length
                                }
                            </span>
                        </h2>
                        <CommandsList
                            groups={groupedAndFilteredCommands.prefixGroups}
                            copyCommand={copyCommand}
                            copiedCommand={copiedCommand}
                        />
                    </div>
                )}

                {/* Show a message when no commands match the filters */}
                {!hasSlashCommands && !hasPrefixCommands && (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-400">
                            No commands found.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

// CommandsList component (remains largely the same, just displays the filtered/grouped data)
const CommandsList = ({
                          groups,
                          copyCommand,
                          copiedCommand,
                      }: {
    groups: CommandGroups;
    copyCommand: (command: string) => void;
    copiedCommand: string | null;
}) => {
    const groupNames = Object.keys(groups); // Get the keys (group names) from the filtered/grouped data

    return (
        <div className="space-y-8">
            {groupNames.map((groupName) => {
                const commandsInGroup = groups[groupName];
                if (commandsInGroup.length === 0) return null; // Don't render empty groups

                return (
                    <div key={groupName} className="bg-gray-800/30 rounded-lg p-1">
                        {/* Only show group title if there's more than one command in the group OR if it's the only command shown under this group name */}
                        {/*{(commandsInGroup.length > 1 || groupNames.length > 1) && (*/}
                        {/*    <h3 className="text-2xl mx-4 mt-4 font-bold text-white mb-4 flex items-center gap-2 bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm border border-gray-700 shadow-md">*/}
                        {/*        {groupName}{" "}*/}
                        {/*    </h3>*/}
                        {/*)}*/}


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                            {" "}
                            {/* Added grid here */}
                            {commandsInGroup.map((cmd) => (
                                <div
                                    key={cmd.name}
                                    className="bg-gray-800/70 rounded-lg p-6 backdrop-blur-sm border border-gray-700 shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        {/* Command Name and Categories */}
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">
                                                {cmd.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {cmd.categories.map((category, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-md"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Copy Button */}
                                        <button
                                            onClick={() => copyCommand(cmd.name)}
                                            className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-4"
                                            title={`Copy command: ${cmd.name}`}
                                        >
                                            {copiedCommand === cmd.name ? (
                                                <Check className="h-5 w-5 text-green-400"/>
                                            ) : (
                                                <Copy className="h-5 w-5"/>
                                            )}
                                        </button>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 mb-4">{cmd.description}</p>

                                    {/* Example Usage */}
                                    <p className="text-gray-500 text-sm mb-1">Example:</p>
                                    <div
                                        className="bg-gray-900/60 rounded p-3 font-mono text-sm text-gray-300 flex items-center gap-2 flex-wrap">
                                        {cmd.name.startsWith("/") ? (
                                            cmd.parameters && cmd.parameters.length > 0 ? (
                                                <>
                                                    <span className="mr-2">{cmd.name}</span>{" "}
                                                    {/* Command name */}
                                                    {cmd.parameters.map((param, index) => (
                                                        <span
                                                            key={index}
                                                            className={cn("mr-2 bg-purple-500/20 pl-2 rounded-md flex items-center", {
                                                                "bg-purple-500/20": param.required,
                                                                "bg-gray-500/20": !param.required,
                                                            })}
                                                        >
                                                            {" "}
                                                            {/* Wrapper for param name and example */}
                                                            <span className={cn("font-medium ", {
                                                                "text-purple-300": param.required,
                                                                "text-gray-300": !param.required,
                                                            })}>
                                                                {param.name}:
                                                            </span>{" "}
                                                            {/* Parameter name */}
                                                            {param.example && (
                                                                <span
                                                                    className={cn("inline-block text-xs px-1.5 py-0.5 rounded-md ml-1", {
                                                                        "bg-purple-500/20 text-purple-300": param.required,
                                                                        "bg-gray-500/20 text-gray-300": !param.required,
                                                                    })}>
                                                                    {" "}
                                                                    {/* Colored example value */}
                                                                    {param.example}
                                                                </span>
                                                            )}
                                                        </span>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-purple-300">{cmd.name}</span>
                                            )
                                        ) : (
                                            <>
                                                <span className="mr-2">{cmd.name}</span>{" "}
                                                {/* Command name */}
                                                {cmd.parameters &&
                                                    cmd.parameters.length > 0 &&
                                                    cmd.parameters.map((param, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-purple-500/20 text-purple-300 text-xs px-1.5 py-0.5 rounded-md mr-2" // Style for the param example/placeholder
                                                        >
                                                            {param.example || `<${param.name}>`}{" "}
                                                            {/* Use example if available, fallback to placeholder */}
                                                        </span>
                                                    ))}
                                            </>
                                        )}
                                    </div>

                                    {/* Parameters List */}
                                    {cmd.parameters && cmd.parameters?.length > 0 && (
                                        <Accordion type="single" collapsible className="mt-4">
                                            <AccordionItem
                                                value="parameters"
                                                className="border-none"
                                            >
                                                <AccordionTrigger
                                                    className="py-2 text-gray-500 text-sm hover:no-underline">
                                                    Parameters ({cmd.parameters.length})
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-2 pt-2">
                                                        {cmd.parameters?.map((param, index) => (
                                                            <div key={index} className="text-sm">
                                                                 <span className="font-medium text-purple-400">
                                                                     {param.name}
                                                                 </span>
                                                                <span
                                                                    className={`ml-2 text-xs ${
                                                                        param.required
                                                                            ? "text-red-400 font-semibold"
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                     {param.required ? "(required)" : "(optional)"}
                                                                 </span>
                                                                <span
                                                                    className="block text-gray-300 text-xs pl-2 border-l-2 border-gray-700 ml-1 mt-1">
                                                                     {param.description}
                                                                 </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

