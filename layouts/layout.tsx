import { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
      <main className='flex h-full flex-col'>
        <NavBar />
        {children}
      </main>
  );
};

export default Layout;
