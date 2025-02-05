import Link from 'next/link'
import React from 'react'
import { FollowerPointerCard } from '../ui/following-pointer'
import CompanyName from './Company-name'
import { Circle } from 'lucide-react'
import { ModeToggle } from './Toggle-Mode'
import WaveStatus from '../ui/wave-status'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='fixed w-full top-0 z-50'>
            <div className='flex justify-between w-full md:px-36 px-2 md:py-8 py-4'>
                <div>
                    <CompanyName className='text-2xl' />
                </div>
              
                <div className='flex flex-col gap-y-2'>
                    <div className='flex gap-x-4 items-center'>
                        <h6 className='text-customGrayLight'>STABILITY</h6>
                        <Circle color='green' />
                        <ModeToggle/>
                    </div>
                    <WaveStatus />
                </div>
            </div>
        </div>
    )
}

export default Header