import Icon from '../Icon/Icon'

interface AvatarProps {
    src: string
    alt: string
}

const Avatar = ({ src, alt }: AvatarProps) => {
    return (
        <button className={'avatar'}>
            <Icon src={src} alt={alt} radius={'rounded-full'} />
        </button>
    )
}

export default Avatar
