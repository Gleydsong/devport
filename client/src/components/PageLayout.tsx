import type { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";

type PageLayoutProps = PropsWithChildren;

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
