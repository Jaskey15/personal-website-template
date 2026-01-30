import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl";
  centerContent?: boolean;
  className?: string;
  padding?: string;
}

export function PageContainer({
  children,
  maxWidth = "7xl",
  centerContent = false,
  className = "",
  padding = "px-6"
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "7xl": "max-w-7xl",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${padding} ${centerContent ? "flex flex-col justify-center" : ""} ${className}`}>
        <div className={`mx-auto py-8 md:py-12 ${maxWidthClasses[maxWidth]}`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
