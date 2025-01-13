
import "./icon.css";
interface IconProps {
  src: string;
  alt: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  size?: "sm" | "md" | "lg";

  onClick?: () => void;
  isClickable?: boolean;

  children?: React.ReactNode;
}

const Icon = ({
  src,
  alt,
  radius = "rounded",
  size = "sm",
  isClickable = false,
  children,
  onClick
  
}: IconProps) => {
  return (
    <span className={`${isClickable ? "icon" : ""} ${size}`} onClick={onClick}>
      <img src={src} alt={alt} className={radius} /> {children}
    </span>
  );
};

export default Icon;
