import Icon from '../Icon/Icon'
import styles from './avater.module.css'
interface AvatarProps {
    src: string
    alt: string
}

const Avatar = ({ src, alt }: AvatarProps) => {
    return (
        <button className={styles.avatar}>
            <Icon size='md' src={src} alt={alt} radius={'rounded-full'} />
        </button>
    )
}

export default Avatar
