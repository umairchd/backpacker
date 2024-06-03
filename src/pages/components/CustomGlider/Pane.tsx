import { FC, PropsWithChildren } from "react";

interface PaneProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

const Pane: FC<PropsWithChildren<PaneProps>> = function Pane({ children, style, className }) {
  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

export default Pane;
