"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-8 flex items-center">
        <Image src="/logo.svg" alt="GameAI Logo" width={140} height={40} priority />
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录账户</CardTitle>
          <CardDescription>输入您的凭据以访问您的账户</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="your-email@example.com" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">密码</Label>
              <Link 
                href="/auth/reset-password" 
                className="text-sm text-primary hover:text-primary/90 hover:underline"
              >
                忘记密码?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">记住我</Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit">登录</Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">还没有账户? </span>
            <Link 
              href="/auth/register" 
              className="text-primary hover:text-primary/90 hover:underline"
            >
              注册
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 