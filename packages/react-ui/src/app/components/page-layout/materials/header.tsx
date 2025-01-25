import { ReactNode } from "react";

interface PgaeHeaderProps {
  children: ReactNode;
}

export const PgaeHeader: React.FC<PgaeHeaderProps> = ({ children }) => {
  return (
    <div className="flex h-[50px] items-center mb-5">
      {children}
    </div>
  );
};