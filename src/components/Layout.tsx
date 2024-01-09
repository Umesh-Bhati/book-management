import { FC, ReactNode } from "react";
import Header from "./Header";

interface ILayout {
  children: ReactNode | ReactNode[];
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
