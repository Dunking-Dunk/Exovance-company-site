import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?:string
}

const CompanyName = (props: Props) => {
    return (
        <h1 className={cn(props.className,"font-medium tracking-widest text-customGrayLight")}><span className="gap-1 inline-flex mr-2"><span className="bg-customGrayLight text-black rounded-lg mx-1">E</span><span className="bg-customGrayLight text-black rounded-lg mx-1">X</span><span className="rounded-lg bg-customGrayLight text-black">O</span> </span>VANCE</h1>
    )
}

export default CompanyName

