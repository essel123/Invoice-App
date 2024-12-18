import React from "react";

interface HeadlineProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const Headline: React.FC<HeadlineProps> = ({ level, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag>
      {children}
    </Tag>
  );
};

export default Headline;
