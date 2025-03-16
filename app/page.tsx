import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar transparent />
      
      {/* Hero部分 */}
      <section className="relative pt-20 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">游戏AI赋能平台</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl">
              为游戏开发者提供全方位的AI能力，加速游戏开发，提升游戏体验
            </p>
            <p className="text-md text-muted-foreground mb-8 max-w-2xl">
              由世纪华通集团(证券代码:002602)旗下游戏AI研发团队倾力打造
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="min-w-[160px]">
                  免费开始使用
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  查看演示
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 relative w-full max-w-5xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30" />
              <div className="relative bg-card rounded-lg overflow-hidden border border-border shadow-xl">
        <Image
                  src="/images/dashboard-preview.png" 
                  alt="GameAI平台界面预览" 
                  width={1200} 
                  height={675}
                  className="w-full h-auto"
          priority
        />
              </div>
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="absolute top-1/4 left-5 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
      </section>

      {/* 痛点解决部分 */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">我们解决游戏开发中的核心痛点</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              为中小型游戏开发者和团队提供专业级AI能力，让每个游戏都能拥有顶尖的AI体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
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
                    <path d="M12.5 3.3 20 8l-7.5 4.7L5 8l7.5-4.7Z" />
                    <path d="M20 8v8l-7.5 4.7" />
                    <path d="M20 16l-7.5-4.7" />
                    <path d="M4 16l8 5" />
                    <path d="M4 8v8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">建模痛点</h3>
                <p className="text-muted-foreground mb-4">
                  中小型开发者缺乏专业建模人员和美术资源，很难创建高质量游戏资产
                </p>
                <p className="text-primary text-sm font-medium">
                  AI一键生成模型，省时又省力
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
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
                    <path d="M16 18h6" />
                    <path d="M2 6h6" />
                    <path d="M2 12h20" />
                    <path d="M9 18h3" />
                    <path d="M15 6h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">开发痛点</h3>
                <p className="text-muted-foreground mb-4">
                  接入AI能力门槛高，需要调研选型多种服务，花费大量时间进行技术对接
                </p>
                <p className="text-primary text-sm font-medium">
                  一站式SDK和插件，十分钟接入全套AI能力
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">灵感痛点</h3>
                <p className="text-muted-foreground mb-4">
                  游戏创意和剧情设计常常陷入瓶颈，难以突破思维定式产生新颖创意
                </p>
                <p className="text-primary text-sm font-medium">
                  AI辅助灵感生成，提供多元创意方案
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="py-24" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">关于我们</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              背靠游戏行业龙头企业，致力于推动AI技术在游戏领域的创新应用
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">世纪华通集团</h3>
              <p className="text-muted-foreground mb-4">
                世纪华通集团(证券代码:002602)成立于2005年，2011年7月在深圳证券交易所成功上市。2014年开始向互联网游戏产业转型，2019年以298亿元完成了对盛趣游戏(原盛大游戏)的并购，目前旗下有《热血传奇》、《龙之谷》、《传奇世界》等多款S级产品，是A股名列前茅的文化传媒板块上市公司，腾讯、华侨城为重要股东。
              </p>
              <p className="text-muted-foreground mb-4">
                集团业务涵盖互联网游戏、汽车零部件制造、云数据、脑科学研究、数字药物、AR/VR内容开发与应用、数字红色文旅及投资等多个领域。
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">互联网游戏业务</h3>
              <p className="text-muted-foreground mb-4">
                集团互联网游戏业包含盛趣游戏、点点互动、天游软件、七酷网络等多家子公司，拥有集研发、发行、运营为一体的业务布局。截至目前，世纪华通旗下拥有数十款知名IP，超百款在营产品持续盈利，发行范围覆盖全球200多个国家与地区，全球注册用户超过30亿，是全球领先的网络游戏开发商与运营商。
              </p>
              <h3 className="text-2xl font-bold mb-4 mt-6">项目愿景</h3>
              <p className="text-muted-foreground mb-4">
                由国内游戏企业龙头世纪华通（前盛大游戏）打造的下一代AI游戏基础设施，旨在构建智能生成式PaaS平台。通过实时生成游戏文本、对话策略及动态场景，实现千人千面NPC交互、多类型游戏适配和商业智能化融合。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心能力部分 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">全方位的游戏AI能力</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              一站式解决方案，满足游戏开发全流程中的AI需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "3D模型生成",
                description: "通过文本描述生成高质量3D模型和纹理，支持各种风格和类型，轻松创建游戏资产",
                icon: (
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
                    <path d="M12.5 3.3 20 8l-7.5 4.7L5 8l7.5-4.7Z" />
                    <path d="M20 8v8l-7.5 4.7" />
                    <path d="M20 16l-7.5-4.7" />
                    <path d="M4 16l8 5" />
                    <path d="M4 8v8" />
                  </svg>
                ),
              },
              {
                title: "游戏创意点子",
                description: "AI助力生成游戏创意、剧情设计和机制建议，突破思维限制，激发创作灵感",
                icon: (
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
                    <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                    <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                    <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                    <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                    <path d="M9 9h6M9 15h6" />
                  </svg>
                ),
              },
              {
                title: "游戏图像创作",
                description: "生成概念图、游戏截图、图标等各类游戏图像资源，多种艺术风格一键切换",
                icon: (
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
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                ),
              },
              {
                title: "代码生成",
                description: "AI辅助生成游戏代码，包括游戏机制、角色控制、UI元素等，加速开发流程",
                icon: (
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
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
              },
              {
                title: "Unity编辑器集成",
                description: "无缝集成到Unity工作流中，在编辑器中直接生成和使用AI生成的资产和代码",
                icon: (
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                  </svg>
                ),
              },
              {
                title: "游戏NPC智能对话",
                description: "为游戏NPC注入智能对话能力，根据游戏情境动态生成对话内容，提升游戏沉浸感",
                icon: (
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={`feature-${feature.title}`} className="group relative p-6 border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-md bg-card">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 招聘信息 */}
      <section className="py-24 bg-muted/50" id="join">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">加入我们</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              我们正在寻找优秀的人才，一起打造下一代游戏AI基础设施
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">大模型开发工程师</h3>
                <div className="mb-4">
                  <h4 className="font-bold text-md mb-2">岗位职责</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    <li>负责垂域大模型的架构设计与训练</li>
                    <li>负责多智能体协同工作场景开发与部署</li>
                    <li>负责快速复现开源项目并形成评估报告</li>
                    <li>设计模型量化蒸馏方案与推理加速</li>
                    <li>参与大模型训练数据选择与清洗</li>
                  </ul>
                  <h4 className="font-bold text-md mb-2">任职要求</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>对Transformer架构有深入理解，了解大模型SFT、后训练、强化学习流程</li>
                    <li>熟练掌握pytorch/accelerate/transformers等常用框架</li>
                    <li>有Linux环境下的开发经验，了解CUDA配置、多GPU协同训练架构配置</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">大模型提示工程师</h3>
                <div className="mb-4">
                  <h4 className="font-bold text-md mb-2">岗位职责</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    <li>设计面向游戏的剧情推演prompt工程体系</li>
                    <li>开发NPC对话生成的控制模板</li>
                    <li>设计反渗透、反破解的提示词体系</li>
                    <li>优化广告植入的上下文引导策略</li>
                    <li>参与大模型训练数据选择与清洗</li>
                  </ul>
                  <h4 className="font-bold text-md mb-2">任职要求</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>精通提示词对大模型输出的影响（1年以上prompt工程经验）</li>
                    <li>掌握思维链构建技巧与reasoning-oriented提示思路</li>
                    <li>掌握大模型输出格式固定技巧与迭代优化方法</li>
                    <li>自动化测试框架开发能力</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">大模型数据分析师</h3>
                <div className="mb-4">
                  <h4 className="font-bold text-md mb-2">岗位职责</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    <li>构建玩家行为数据分析体系</li>
                    <li>设计大模型输出质量评估指标（合格率/毒性分析/偏见分析）</li>
                    <li>开发AB测试框架与效果追踪系统</li>
                    <li>优化用户画像建模方案</li>
                    <li>评估游戏内广告植入效果</li>
                  </ul>
                  <h4 className="font-bold text-md mb-2">任职要求</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>1年以上大模型数据分析/3年以上游戏数据分析经验</li>
                    <li>因果推断与反事实分析能力</li>
                    <li>PySpark大数据处理技术</li>
                    <li>LLM评估方法论（如HELM框架）熟悉度</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">游戏接口工程师</h3>
                <div className="mb-4">
                  <h4 className="font-bold text-md mb-2">岗位职责</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    <li>设计游戏引擎与大模型的通信协议</li>
                    <li>开发场景描述数据标准化接口</li>
                    <li>根据大模型输出json实现游戏侧实时动作变化</li>
                    <li>AI驱动实时场景渲染引擎设计</li>
                    <li>参与大模型训练数据选择与清洗</li>
                  </ul>
                  <h4 className="font-bold text-md mb-2">任职要求</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>2年以上游戏开发经验（Unity/Unreal底层架构了解）</li>
                    <li>C++/C#/Lua编程语言熟练度</li>
                    <li>网络同步与状态机设计经验</li>
                    <li>联机游戏网络设计与接口结构知识</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/join-us">
              <Button size="lg">申请职位</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 价格部分 */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">灵活的价格方案</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              从个人开发者到大型工作室，我们提供满足各种需求的套餐方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">免费套餐</h3>
                  <p className="text-muted-foreground text-sm mt-1">适合个人开发者和小型项目</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold">¥0</span>
                  <span className="text-muted-foreground">/月</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>每月1000次API调用</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>基础3D模型生成</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>社区技术支持</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">开始使用</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                最受欢迎
              </div>
              <CardContent className="p-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">专业版</h3>
                  <p className="text-muted-foreground text-sm mt-1">适合独立工作室和中型项目</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold">¥299</span>
                  <span className="text-muted-foreground">/月</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>每月50,000次API调用</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>全部AI服务访问权限</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Unity插件完整版</span>
          </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>邮件技术支持</span>
          </li>
                </ul>
                <Button className="w-full">立即订阅</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">企业版</h3>
                  <p className="text-muted-foreground text-sm mt-1">适合大型工作室和商业项目</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold">定制</span>
                  <span className="text-muted-foreground" />
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>定制化API调用配额</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>私有化部署选项</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>定制化AI模型训练</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success mr-2"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>专属技术支持团队</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">联系我们</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 号召行动部分 */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好提升您的游戏开发体验了吗？</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            加入成千上万的游戏开发者，使用AI赋能您的游戏项目，让创作更高效、更有趣
          </p>
          <Link href="/auth/register">
            <Button className="bg-white text-primary hover:bg-white/90 hover:text-primary min-w-[180px]" size="lg">
              免费注册
            </Button>
          </Link>
        </div>
      </section>

      {/* 页脚部分 */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo.svg" alt="GameAI Logo" width={140} height={40} className="mb-4" />
              <p className="text-muted-foreground mb-4">
                为游戏开发者提供全方位的AI赋能，创造无限可能
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                世纪华通集团旗下AI游戏基础设施
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
        </a>
        <a
                  href="https://twitter.com" 
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
        </a>
        <a
                  href="https://linkedin.com" 
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2">
                <li><a href="/features">功能</a></li>
                <li><a href="/pricing">价格</a></li>
                <li><a href="/showcase">案例展示</a></li>
                <li><a href="/integrations">集成方案</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">资源</h4>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-muted-foreground hover:text-primary">文档</a></li>
                <li><a href="/api" className="text-muted-foreground hover:text-primary">API参考</a></li>
                <li><a href="/downloads" className="text-muted-foreground hover:text-primary">SDK下载</a></li>
                <li><a href="/tutorials" className="text-muted-foreground hover:text-primary">教程</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">公司</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-muted-foreground hover:text-primary">关于我们</a></li>
                <li><a href="/blog" className="text-muted-foreground hover:text-primary">博客</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-primary">联系我们</a></li>
                <li><a href="/careers" className="text-muted-foreground hover:text-primary">加入我们</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 GameAI - 世纪华通集团旗下产品. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm">隐私政策</a>
              <a href="/terms" className="text-muted-foreground hover:text-primary text-sm">服务条款</a>
              <a href="/cookies" className="text-muted-foreground hover:text-primary text-sm">Cookie设置</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
