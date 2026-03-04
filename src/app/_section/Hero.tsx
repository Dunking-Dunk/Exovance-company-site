"use client"

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const View = dynamic(() => import('../../components/canva/View').then((mod) => mod.View), { ssr: false });
const ExovanceLogo = dynamic(() => import('../../components/canva/ExovanceLogo').then((mod) => mod.ExovanceLogo), { ssr: false });

export default function Hero() {
    return (
        <section className="relative z-10 h-[100dvh] w-full overflow-hidden">

            {/* bottom rule */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />

            {/* 3-D logo */}
            <div className="absolute inset-0 z-[1] w-full h-full pointer-events-none" aria-hidden>
                <View className="w-full h-full">
                    <ExovanceLogo scale={1.2} />
                </View>
            </div>

            {/* Bottom-left: location */}
            <motion.div
                className="absolute bottom-10 left-8 md:left-14 z-[2] flex flex-col gap-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 2.0 }}
            >
                <span className="font-mono text-[8px] tracking-[0.45em] uppercase text-violet-400/50">Chennai · India</span>
                <span className="font-mono text-[8px] tracking-[0.45em] uppercase text-violet-400/40">Est. 2024</span>
            </motion.div>

            {/* Bottom-right: scroll cue */}
            <motion.div
                className="absolute bottom-8 right-8 md:right-14 z-[2] flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 2.2 }}
            >
                <span className="font-mono text-[8px] tracking-[0.45em] uppercase text-violet-400/50 rotate-90 origin-center mb-6">Scroll</span>
                <motion.div
                    className="w-px h-12 bg-gradient-to-b from-violet-400/30 to-transparent"
                    animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

        </section>
    );
}
