import {STATS} from "@/settings/stats";
import CountUp from "react-countup";
import {motion} from "framer-motion";


const Stats = () => {

    return (
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((stat) => {
                const numericValue = parseInt(stat.value) || 0;

                return (
                    <div
                        key={stat.title}
                        className="bg-gray-800/50 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                        <div className="flex justify-center mb-4">
                            <stat.icon className="h-8 w-8 text-purple-500"/>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <CountUp
                                    end={numericValue}
                                    duration={2}
                                    suffix={stat.value.includes('+') ? '+' : ''}
                                    preserveValue={true}
                                    start={0}
                                />
                            </motion.span>
                        </motion.div>
                        <div className="text-gray-400">{stat.title}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Stats;