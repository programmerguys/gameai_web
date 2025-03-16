import type React from 'react';
import { Navbar } from '@/components/ui/navbar';

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
} 