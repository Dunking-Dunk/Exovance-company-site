"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <motion.button
            className="relative inline-flex h-[40px] w-[80px] items-center rounded-full bg-slate-200 p-1 dark:bg-slate-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-950"
                layout
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30
                }}
            >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 text-yellow-500" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 text-blue-500" />
            </motion.div>
        </motion.button>
    )
}
