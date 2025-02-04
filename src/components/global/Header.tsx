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
            <div className='flex justify-between w-full px-36 py-8'>
                <div>
                    <CompanyName className='text-2xl' />
                </div>
                <ul className='flex items-center text-customGrayLight gap-x-12 font-normal text-base border-[1px] border-customGrayDark px-10 py-2 rounded-xl h-10' >
                    <FollowerPointerCard><Link href={'/'} >About</Link></FollowerPointerCard>
                    <FollowerPointerCard><Link href={'/'}>Services</Link></FollowerPointerCard>
                    <FollowerPointerCard><Link href={'/'}>Team</Link></FollowerPointerCard>
                    <FollowerPointerCard><Link href={'/'}>Contact</Link></FollowerPointerCard>
                </ul>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex gap-x-4 items-center'>
                        <h6 className='text-customGrayLight'>STABILITY</h6>
                        <Circle color='green' />
                        <ModeToggle />
                    </div>
                    <WaveStatus />
                </div>
            </div>
        </div>
    )
}

export default Header