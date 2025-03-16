import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewAppPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">创建新应用</h1>
        <p className="text-muted-foreground">
          配置您的游戏应用以使用GameAI服务
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>填写应用的基本设置</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="app-name" className="text-sm font-medium mb-1 block">
                  应用名称 <span className="text-destructive">*</span>
                </label>
                <input 
                  id="app-name"
                  type="text" 
                  className="w-full p-2 rounded-md border border-input bg-background" 
                  placeholder="例如：我的冒险游戏"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  这将成为您应用的标识名称
                </p>
              </div>
              
              <div>
                <label htmlFor="app-description" className="text-sm font-medium mb-1 block">
                  应用描述 <span className="text-destructive">*</span>
                </label>
                <textarea 
                  id="app-description"
                  className="w-full p-2 rounded-md border border-input bg-background h-24" 
                  placeholder="简要描述您的游戏应用..."
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  详细描述您的游戏，包括游戏类型、玩法等
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-category" className="text-sm font-medium mb-1 block">
                    游戏类型 <span className="text-destructive">*</span>
                  </label>
                  <select 
                    id="app-category"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="" disabled selected>选择游戏类型</option>
                    <option value="action">动作游戏</option>
                    <option value="adventure">冒险游戏</option>
                    <option value="rpg">角色扮演</option>
                    <option value="strategy">策略游戏</option>
                    <option value="simulation">模拟经营</option>
                    <option value="puzzle">解谜游戏</option>
                    <option value="sports">体育游戏</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="app-platform" className="text-sm font-medium mb-1 block">
                    发布平台 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" id="platform-ios" className="rounded border-gray-300" />
                      <span>iOS</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" id="platform-android" className="rounded border-gray-300" />
                      <span>Android</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" id="platform-pc" className="rounded border-gray-300" />
                      <span>PC</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" id="platform-console" className="rounded border-gray-300" />
                      <span>主机</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" id="platform-web" className="rounded border-gray-300" />
                      <span>Web</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="app-icon" className="text-sm font-medium mb-1 block">
                  应用图标
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 border-2 border-dashed border-input rounded-lg flex items-center justify-center text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <line x1="16" x2="22" y1="5" y2="5" />
                      <line x1="19" x2="19" y1="2" y2="8" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <Button variant="outline" type="button">
                    上传图标
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    最佳尺寸：512×512像素 (PNG或JPG)
                  </p>
                </div>
              </div>
              
              <div>
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium mb-1 block">
                    应用环境
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="app-status" 
                        value="development" 
                        className="rounded-full border-gray-300"
                        defaultChecked
                      />
                      <span>开发中</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="app-status" 
                        value="production" 
                        className="rounded-full border-gray-300"
                      />
                      <span>生产环境</span>
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard/apps">
            <Button variant="outline">取消</Button>
          </Link>
          <Button>创建应用</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API服务选择</CardTitle>
          <CardDescription>选择您需要的GameAI服务</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-3d-model" 
                className="mt-1 rounded border-gray-300"
                defaultChecked
              />
              <div>
                <label htmlFor="service-3d-model" className="font-medium block">
                  3D模型生成
                </label>
                <p className="text-sm text-muted-foreground">
                  基于文本描述生成游戏中的3D模型和资产
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-idea" 
                className="mt-1 rounded border-gray-300"
                defaultChecked
              />
              <div>
                <label htmlFor="service-idea" className="font-medium block">
                  创意点子生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏故事、角色背景、任务和对话内容
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-code" 
                className="mt-1 rounded border-gray-300"
                defaultChecked
              />
              <div>
                <label htmlFor="service-code" className="font-medium block">
                  代码生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏逻辑、AI行为和游戏机制的代码
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-animation" 
                className="mt-1 rounded border-gray-300"
              />
              <div>
                <label htmlFor="service-animation" className="font-medium block">
                  动画生成
                </label>
                <p className="text-sm text-muted-foreground">
                  为角色和场景生成自然流畅的动画
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-sound" 
                className="mt-1 rounded border-gray-300"
              />
              <div>
                <label htmlFor="service-sound" className="font-medium block">
                  音效与音乐生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏音效和背景音乐
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button size="lg">
          创建并配置API密钥
        </Button>
      </div>
    </div>
  );
} 