import './icon.css'
interface IconProps {
    src: string
    alt: string
    radius?:
        | 'rounded'
        | 'rounded-sm'
        | 'rounded-md'
        | 'rounded-lg'
        | 'rounded-full'
    size?: 'sm' | 'md' | 'lg'
}

const Icon = ({ src, alt, radius = 'rounded', size = 'sm' }: IconProps) => {
    return (
        <span className={`icon ${size}`}>
            <img src={src} alt={alt} className={radius} />
        </span>
    )
}

export default Icon
