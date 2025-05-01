"use client"

import React, {useEffect, useState} from "react";
import {ChevronsUp} from "lucide-react";
import {cn} from "@/lib/utils";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled half of viewport height
            if (window.scrollY > window.innerHeight / 2) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    return (
        <button
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className={cn("fixed bottom-8 right-8 bg-gray-800/70 hover:bg-gray-700/70 text-white px-2 py-2 rounded-lg transition-all backdrop-blur-sm border border-gray-700 shadow-md z-50",
                {
                    "opacity-100": isVisible,
                    "opacity-0": !isVisible,
                })}
        >
            <ChevronsUp/>
        </button>
    );
}

export default BackToTop;