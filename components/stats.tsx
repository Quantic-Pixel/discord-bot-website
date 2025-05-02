import {Stat as StatInterface, STATS} from "@/settings/stats";
import CountUp from "react-countup";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";


function StatMotionElement(props: { end: any, suffix?: string }) {
    console.log("StatMotionElement", props.end, props.suffix);
    return <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        className="text-3xl font-bold text-white mb-2"
    >
        <motion.span
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
        >
            <CountUp
                end={props.end}
                duration={2}
                suffix={props.suffix}
                preserveValue={true}
                start={0}
            />
        </motion.span>
    </motion.div>;
}

function Stat(props: {
    end: any,
    stat: StatInterface,
    isDynamic?: boolean
}) {
    const Icon = props.stat.Icon;
return <div
            className="bg-gray-800/50 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors relative"
        >
            {props.isDynamic && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 animate-pulse"/>
            )}
            <div className="flex justify-center mb-4">
                <Icon className="h-8 w-8 text-purple-500"/>
            </div>
            <StatMotionElement end={props.end} suffix={props.stat.suffix}/>
            <div className="text-gray-400">{props.stat.title}</div>
        </div>;
}

const Stats = () => {
    const [statsData, setStatsData] = useState<Array<{ value: number, stat: StatInterface }>>([]);

    useEffect(() => {
        const loadStats = async () => {
            const loadedStats = await Promise.all(
                STATS.map(async (stat) => ({
                    value: stat.loader ? await stat.loader() : stat.value,
                    stat: stat
                }))
            );
            setStatsData(loadedStats);
        };
        loadStats().then(r => r);
    }, []);

    const LoadingStat = () => (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700">
            <div className="flex justify-center mb-4">
                <div className="h-8 w-8 bg-purple-500/20 rounded animate-pulse"/>
            </div>
            <div className="h-9 bg-white/20 rounded mb-2 animate-pulse"/>
            <div className="h-6 w-24 mx-auto bg-gray-400/20 rounded animate-pulse"/>
        </div>
    );

    return (
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {statsData.length === 0 ?
                <>
                    <LoadingStat/>
                    <LoadingStat/>
                    <LoadingStat/>
                </> : <>
                    {statsData.map(({value, stat}) => (
                        <Stat key={stat.title} end={value} stat={stat}
                              isDynamic={stat.loader !== undefined}
                        />
                    ))}
                </>
            }
        </div>
    );
};

export default Stats;