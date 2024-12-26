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
}

const Icon = ({
  src,
  alt,
  radius = "rounded",
  size = "sm",
  isClickable = false,
  onClick
}: IconProps) => {
  return (
    <span className={`${isClickable?'icon':''} ${size}`} onClick={onClick}>
      <img src={src} alt={alt} className={radius} />
    </span>
  );
};

export default Icon;
