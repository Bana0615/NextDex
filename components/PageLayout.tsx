"use client";

// --- React ---
import React from "react";
// --- Components ---
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";

interface NavLink {
  label: string;
  href: string;
  target?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  headerClassName?: string;
  navLinks?: NavLink[];
  showHeader?: boolean;
  showFooter?: boolean;
  headerDarkLinks?: boolean;
  headerShowBadge?: boolean;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function PageLayout({
  children,
  headerClassName = "",
  navLinks = [],
  showHeader = true,
  showFooter = true,
  headerDarkLinks = false,
  headerShowBadge = false,
}: PageLayoutProps) {
  return (
    <div className="main-container">
      {showHeader && (
        <MonHeader
          className={headerClassName}
          navLinks={navLinks}
          showBadge={headerShowBadge}
        />
      )}
      <main className="main-content">{children}</main>
      {showFooter && <MonFooter />}
    </div>
  );
}
