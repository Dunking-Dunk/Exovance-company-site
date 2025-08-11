"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { members } from '@/lib/data';

const CoreTeam = () => {
    return (
        <section className="relative w-full py-24 md:py-32">
            <div className="px-4 md:px-32 ">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-3">
                        Our Core Team
                    </h2>
                    <p className="text-customGrayDarker text-lg">
                        The people building, shipping, and scaling Exovance every day.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((m, i) => (
                        <motion.div
                            key={m.name + i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="rounded-xl border border-white/10 bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden"
                        >
                            <div className="relative aspect-square w-full">
                                <Image src={m.photo} alt={m.name} fill className="object-cover" />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-customGrayLight">{m.name}</h3>
                                <p className="text-sm text-customGrayDarker">{m.role}</p>
                                <p className="text-sm text-customGrayDarker mt-3 leading-relaxed">{m.bio}</p>
                                {(m.links?.linkedin || m.links?.github) && (
                                    <div className="flex gap-4 pt-3">
                                        {m.links?.linkedin && (
                                            <Link href={m.links.linkedin} className="text-customGrayDarker hover:text-customGrayLight" aria-label="LinkedIn">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764c.967 0 1.75.79 1.75 1.764s-.783 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.06-1.865-3.06-1.867 0-2.154 1.459-2.154 2.965v5.699h-3v-10h2.878v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.603v5.593z" /></svg>
                                            </Link>
                                        )}
                                        {m.links?.github && (
                                            <Link href={m.links.github} className="text-customGrayDarker hover:text-customGrayLight" aria-label="GitHub">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.019c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.252-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.851.004 1.706.115 2.505.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.202 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.697-4.566 4.945.36.31.678.92.678 1.854 0 1.338-.012 2.418-.012 2.747 0 .267.18.579.688.48A10.022 10.022 0 0 0 22 12.019C22 6.484 17.523 2 12 2Z" clipRule="evenodd" /></svg>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreTeam;


