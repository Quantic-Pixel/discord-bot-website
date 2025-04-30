"use client"

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {QUESTIONS_AND_ANSWERS} from "@/settings/qna"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {MessageCircleQuestion} from "lucide-react";

const QuestionAndAnswers = () => {
    return (
        <>
            <div className="text-center mb-16">
                <div
                    className="flex justify-center flex-col"
                >
                    <div className="flex justify-center mb-8">
                        <MessageCircleQuestion className="h-20 w-20 text-purple-500"/>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">FAQ</h1>
                </div>
                <p className="text-xl text-gray-300">
                    Hilft dir bei allgemeinen Fragen
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {QUESTIONS_AND_ANSWERS.map((qa, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700"
                    >
                        <AccordionTrigger className="text-left px-6 text-white hover:text-white">
                            {qa.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-300">
                            <div className="markdown">
                                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {qa.answer}
                                </Markdown>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

export default QuestionAndAnswers;