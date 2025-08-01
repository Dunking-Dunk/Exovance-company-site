"use client"

import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'
import { Vertebral } from '../canva/Vertebral'
import Spline from '@splinetool/react-spline/next';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PerspectiveCamera } from '@react-three/drei'

const View = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
    ssr: false,
    loading: () => (
        <div className='absolute inset-0 z-10 h-full w-full flex items-center justify-center'>
            <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
            </svg>
        </div>
    ),
})




const Works = () => {
    return (
        <div className='h-[200dvh] relative  z-10'>
            {/* @ts-ignore */}
            <Spline
                className='w-full h-full'
                scene="https://prod.spline.design/hczs9mLzPJBKtpzJ/scene.splinecode"
            />
            {/* <View className='absolute inset-0 -top-[120vh] h-[300dvh] w-full'> */}
            {/* <AnimatedCamera /> */}
            {/* <Vertebral /> */}
            {/* </View> */}
        </div>
    )
}

export default Works