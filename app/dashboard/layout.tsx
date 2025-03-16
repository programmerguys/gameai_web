import type React from 'react';
import { DashboardNavbar } from '@/components/ui/navbar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 