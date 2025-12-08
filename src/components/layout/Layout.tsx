import { type ReactNode } from 'react';
import { useSidebar } from '../../contexts/SidebarContext';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen } = useSidebar();

  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className={`layout-main ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

