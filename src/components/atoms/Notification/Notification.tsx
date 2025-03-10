import { useAppSelector } from "../../../State/hooks";
import './notification.css'

type NotificationProps = {
    message: string;
    type: string;
};

const Notifications = ({ message, type }: NotificationProps) => {
    const isNotification = useAppSelector(
        state => state.pageState.isNotification
    );

    if (isNotification === false) return null;

    return (
        <div className={`notification notification-${type}`}>
            <span>
                {message}
            </span>
        </div>
    );
};

export default Notifications;


