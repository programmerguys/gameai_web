"use client";

import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          isActive && "bg-primary/10 text-primary hover:bg-primary/15"
        )}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium text-sm">{label}</span>
      </Button>
    </Link>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="w-64 h-screen border-r border-border bg-card sticky top-0 left-0 py-5 flex flex-col">
      <div className="px-4 mb-8">
        <h2 className="font-semibold text-lg mb-1">GameAI</h2>
        <p className="text-sm text-muted-foreground">开发者控制台</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <NavItem
          href="/dashboard"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          }
          label="概览"
        />

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            应用管理
          </p>
        </div>

        <NavItem
          href="/dashboard/apps"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 6H3v12h13V6Z" />
              <path d="M21 6h-3v12h3V6Z" />
            </svg>
          }
          label="应用列表"
        />

        <NavItem
          href="/dashboard/api-keys"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="15" r="4" />
              <path d="M10.85 12.15 19 4" />
              <path d="M18 5 20 7" />
              <path d="M15 8 17 10" />
            </svg>
          }
          label="API密钥"
        />

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            游戏创作
          </p>
        </div>

        <NavItem
          href="/dashboard/services/idea-generator"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 7v5l2.5 1.5" />
              <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
            </svg>
          }
          label="创意点子生成"
        />

        <NavItem
          href="/dashboard/services/story-generator"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 9.5V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2.5" />
              <path d="M10 10h7l3 -3l-3 -3h-7" />
              <path d="M17 14h-7l-3 3l3 3h7" />
            </svg>
          }
          label="故事情节生成器"
        />

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI服务
          </p>
        </div>

        <NavItem
          href="/dashboard/services/ai-npc"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
              <path d="M12 14V7" />
              <path d="M9 10l3 4 3-4" />
              <path d="M16 10h6" />
              <path d="M19 7v6" />
            </svg>
          }
          label="AI NPC"
        />

        <NavItem
          href="/dashboard/services/model-generator"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12.5 3.3 20 8l-7.5 4.7L5 8l7.5-4.7Z" />
              <path d="M20 8v8l-7.5 4.7" />
              <path d="M20 16l-7.5-4.7" />
              <path d="M4 16l8 5" />
              <path d="M4 8v8" />
            </svg>
          }
          label="3D模型生成"
        />

        <NavItem
          href="/dashboard/services/code-generator"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          }
          label="代码生成"
        />

        <NavItem
          href="/dashboard/services/chat-test"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
          label="对话测试"
        />

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            账户
          </p>
        </div>

        <NavItem
          href="/dashboard/billing"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          }
          label="账单与套餐"
        />

        <NavItem
          href="/dashboard/settings"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
          label="设置"
        />
      </nav>

      <div className="mt-auto px-3 py-3">
        <div className="flex items-center px-3 py-2 rounded-md bg-muted">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-primary text-primary-foreground">
              D
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">开发者账户</p>
            <p className="text-xs text-muted-foreground">专业版</p>
          </div>
        </div>
      </div>
    </aside>
  );
} 