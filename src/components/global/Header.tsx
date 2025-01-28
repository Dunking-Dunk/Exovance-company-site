import Link from 'next/link'
import React from 'react'
import { FollowerPointerCard } from '../ui/following-pointer'
import CompanyName from './Company-name'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='fixed z-50 top-0 flex justify-between w-full px-52 py-8'>
            <div>
                <CompanyName className='text-2xl'/>
            </div>
            <ul className='flex gap-x-32'>
                <FollowerPointerCard><Link href={'/'} className='cursor-none'>About</Link></FollowerPointerCard>
                <FollowerPointerCard><Link href={'/'} className='cursor-none'>Team</Link></FollowerPointerCard>
                <FollowerPointerCard><Link href={'/'} className='cursor-none'>Contact</Link></FollowerPointerCard>
            </ul>
        </div>
    )
}

export default Header