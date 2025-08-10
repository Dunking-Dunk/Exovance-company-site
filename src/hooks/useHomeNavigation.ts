"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const useHomeNavigation = () => {
    const [isNavigatingToHome, setIsNavigatingToHome] = useState(false);
    const pathname = usePathname();
    const previousPathname = useRef<string | null>(null);
    const isInitialLoad = useRef(true);
    const navigationCount = useRef(0);

    useEffect(() => {

        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            previousPathname.current = pathname;
            return;
        }


        navigationCount.current++;

        if (pathname === '/' && navigationCount.current > 0) {
            setIsNavigatingToHome(true);

            const timer = setTimeout(() => {
                setIsNavigatingToHome(false);
            }, 2500);

            previousPathname.current = pathname;
            return () => clearTimeout(timer);
        }

        previousPathname.current = pathname;
    }, [pathname]);

    const finishHomeNavigation = () => {
        console.log('Manually finishing home navigation');
        setIsNavigatingToHome(false);
    };

    return {
        isNavigatingToHome,
        finishHomeNavigation
    };
};
