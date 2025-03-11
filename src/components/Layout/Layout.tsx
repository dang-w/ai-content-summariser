import Header from './Header';
import Footer from './Footer';
import EnvironmentIndicator from '../EnvironmentIndicator';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <EnvironmentIndicator />
    </div>
  );
};

export default Layout;