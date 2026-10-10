import { type ReactNode } from "react";
import Header from "./Header";
import { SiteFooter, SocialWall } from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="relative z-10 flex-grow overflow-hidden rounded-b-[32px] bg-white lg:rounded-b-[44px]">
        {children}
      </main>
      <SocialWall />
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
