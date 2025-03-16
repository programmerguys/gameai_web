import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavbarProps {
  transparent?: boolean;
  className?: string;
}

interface NavbarLinkProps {
	href: string;
	active?: boolean;
	className?: string;
	children: React.ReactNode;
}

export function Navbar({ transparent = false, className = '' }: NavbarProps) {
  const navbarClasses = transparent 
    ? `w-full py-4 ${className}`
    : `w-full py-4 bg-background/90 backdrop-blur-sm border-b border-border sticky top-0 z-10 ${className}`;

  return (
			<nav className={navbarClasses}>
				<div className="container mx-auto px-4 flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<Image
							src="/logo.svg"
							alt="GameAI Logo"
							width={140}
							height={40}
							priority
						/>
					</Link>

					<div className="hidden md:block">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<Link href="/features" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											功能
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/pricing" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											价格
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/docs" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											文档
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/blog" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											博客
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/#about" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											关于我们
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/#join" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											加入我们
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="flex items-center space-x-4">
						<Link href="/auth/login">
							<Button variant="ghost" className="text-sm font-medium">
								登录
							</Button>
						</Link>
						<Link href="/auth/register">
							<Button variant="default" className="text-sm font-medium">
								注册
							</Button>
						</Link>
					</div>
				</div>
			</nav>
		);
}

export function NavbarLink({ href, active = false, className = '', children }: NavbarLinkProps) {
  const linkClasses = cn(
    "text-foreground hover:text-primary font-medium transition-colors",
    {
      "text-primary": active,
    },
    className
  );

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}

export function DashboardNavbar() {
  return (
    <nav className="w-full py-3 px-4 bg-background border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center">
            <Image src="/logo.svg" alt="GameAI Logo" width={120} height={35} priority />
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      概览
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dashboard/apps" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      应用
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dashboard/api-keys" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      API密钥
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dashboard/billing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      账单
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" aria-label="设置">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
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
          </Button>
          <Button variant="ghost" size="icon" aria-label="通知">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </Button>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
} 