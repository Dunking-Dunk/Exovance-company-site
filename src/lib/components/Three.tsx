import { r3 } from '../tunnel'

type Props = {
    children: React.ReactNode
}

export const Three = ({ children }: Props) => {
    return (
        <r3.In>
            {children}
        </r3.In>
    )
}

