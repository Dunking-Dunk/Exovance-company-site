"use client"

import React from 'react';
import ContactHero from './_section/ContactHero';
import ContactForm from './_section/ContactForm';
import ContactCTA from './_section/ContactCTA';
import { Spotlight2 } from '@/components/ui/spotlight2';

const Contact = () => {
    return (
        <main className="relative w-full h-full">
            <div className="pointer-events-none absolute inset-0 z-[10]">
                <Spotlight2 />
            </div>
            <ContactHero />
            <ContactForm />
            <ContactCTA />
        </main>
    );
};

export default Contact;
