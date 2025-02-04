import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?: string
}

const CompanyName = (props: Props) => {
    return (
        <div className='relative'>
            <div className='absolute bg-customGrayDark -z-10 top-[10%] left-0 bottom-[15%] right-[62.5%] ' />
            <h1 className={cn(props.className, "font-semibold  text-customGrayDark")}><span className='text-customBlack'>EXO</span>VANCE</h1>
        </div>

    )
}

export default CompanyName

