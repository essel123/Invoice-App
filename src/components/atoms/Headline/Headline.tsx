import React from "react";


interface HeadlineProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  tag = "h1",
  children,
  className
}) => {
  const Tag = tag;
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

export default Headline;
