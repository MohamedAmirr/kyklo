import { ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div className="flex h-[50px] items-center mb-5">
      {children}
    </div>
  );
};