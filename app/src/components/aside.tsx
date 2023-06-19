import { createPortal } from "react-dom";

const Aside = ({ children }: { children: React.ReactNode }) => {
  return <aside className="flex flex-col">{children}</aside>;
};

export default Aside;
