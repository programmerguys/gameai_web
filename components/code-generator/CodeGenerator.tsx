'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Download, Code, RefreshCw } from 'lucide-react';
import { ChatInterface } from "./ChatInterface";
import { CodeEditorTabs } from "./CodeEditorTabs";

const CodeGenerator: React.FC = () => {
  // 状态变量
  const [generatedCode, setGeneratedCode] = useState<string>('// 这里将显示生成的Unity C#代码\n\n// 在左侧与AI助手交流，描述您想要实现的游戏功能');
  const [codeType, setCodeType] = useState<'csharp' | 'js' | 'cpp'>('csharp');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // 复制代码到剪贴板
		const copyToClipboard = async () => {
			try {
				await navigator.clipboard.writeText(generatedCode);
				setCopyStatus("copied");
				setTimeout(() => setCopyStatus("idle"), 2000);
			} catch (err) {
				console.error("无法复制代码:", err);
			}
		};
  
  // 处理代码生成
  const handleGenerateCode = (prompt: string) => {
    setIsGenerating(true);
    
    // 在实际应用中应调用API生成代码
    // 这里使用模拟数据
    setTimeout(() => {
      if (prompt.toLowerCase().includes('移动')) {
        setGeneratedCode(`using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [Header("移动设置")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float sprintSpeed = 8f;
    [SerializeField] private float rotationSpeed = 10f;
    
    [Header("物理设置")]
    [SerializeField] private float gravity = -9.81f;
    [SerializeField] private float jumpHeight = 1.5f;
    
    [Header("地面检测")]
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float groundDistance = 0.4f;
    [SerializeField] private LayerMask groundMask;
    
    private CharacterController controller;
    private Vector3 velocity;
    private bool isGrounded;
    private bool isSprinting;
    
    private void Awake()
    {
        controller = GetComponent<CharacterController>();
        
        if (controller == null)
        {
            Debug.LogError("需要CharacterController组件!");
            this.enabled = false;
        }
        
        if (groundCheck == null)
        {
            Debug.LogWarning("未设置地面检测点，将使用脚本所在物体作为检测点");
            groundCheck = transform;
        }
    }
    
    private void Update()
    {
        HandleMovementInput();
        ApplyGravity();
    }
    
    private void HandleMovementInput()
    {
        // 地面检测
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        
        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f; // 防止堆叠重力
        }
        
        // 获取输入
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // 设置移动向量
        Vector3 move = transform.right * horizontal + transform.forward * vertical;
        
        // 冲刺检测
        isSprinting = Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift);
        float currentSpeed = isSprinting ? sprintSpeed : moveSpeed;
        
        // 应用移动
        controller.Move(move * currentSpeed * Time.deltaTime);
        
        // 跳跃
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }
    }
    
    private void ApplyGravity()
    {
        // 应用重力
        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
    }
    
    // 用于外部控制移动的公共方法
    public void MoveCharacter(Vector2 movementInput, bool sprint, bool jump)
    {
        Vector3 moveDirection = transform.right * movementInput.x + transform.forward * movementInput.y;
        float speed = sprint ? sprintSpeed : moveSpeed;
        
        controller.Move(moveDirection * speed * Time.deltaTime);
        
        if (jump && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }
    }
}`);
      } else if (prompt.toLowerCase().includes('碰撞')) {
        setGeneratedCode(`using UnityEngine;
using System.Collections;

public class CollisionHandler : MonoBehaviour
{
    [Header("碰撞设置")]
    [SerializeField] private string targetTag = "Player";
    [SerializeField] private LayerMask collisionLayers;
    [SerializeField] private float detectionRadius = 1.5f;
    
    [Header("反馈效果")]
    [SerializeField] private bool enableVisualEffect = true;
    [SerializeField] private GameObject hitEffectPrefab;
    [SerializeField] private float effectDuration = 1f;
    
    [Header("音频设置")]
    [SerializeField] private bool enableSoundEffect = true;
    [SerializeField] private AudioClip collisionSound;
    [SerializeField] private float volumeScale = 0.7f;
    
    private AudioSource audioSource;
    private bool canTrigger = true;
    private float cooldownTime = 0.5f;
    
    private void Awake()
    {
        if (enableSoundEffect)
        {
            audioSource = GetComponent<AudioSource>();
            
            if (audioSource == null)
            {
                audioSource = gameObject.AddComponent<AudioSource>();
                audioSource.playOnAwake = false;
                audioSource.spatialBlend = 1f; // 3D音效
            }
        }
    }
    
    private void OnCollisionEnter(Collision collision)
    {
        HandleCollision(collision.gameObject);
    }
    
    private void OnTriggerEnter(Collider other)
    {
        HandleCollision(other.gameObject);
    }
    
    private void HandleCollision(GameObject collidedObject)
    {
        // 检查是否可以触发
        if (!canTrigger) return;
        
        // 检查标签
        if (!string.IsNullOrEmpty(targetTag) && !collidedObject.CompareTag(targetTag)) return;
        
        // 检查层级
        if (collisionLayers != 0 && ((1 << collidedObject.layer) & collisionLayers) == 0) return;
        
        // 触发碰撞效果
        if (enableVisualEffect && hitEffectPrefab != null)
        {
            StartCoroutine(ShowHitEffect());
        }
        
        // 播放音效
        if (enableSoundEffect && collisionSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(collisionSound, volumeScale);
        }
        
        // 通知其他组件发生了碰撞
        OnCollisionDetected(collidedObject);
        
        // 设置冷却
        StartCoroutine(TriggerCooldown());
    }
    
    // 显示碰撞特效
    private IEnumerator ShowHitEffect()
    {
        // 创建碰撞效果
        GameObject effect = Instantiate(hitEffectPrefab, transform.position, Quaternion.identity);
        
        // 延时销毁
        yield return new WaitForSeconds(effectDuration);
        
        if (effect != null)
        {
            Destroy(effect);
        }
    }
    
    // 设置触发冷却
    private IEnumerator TriggerCooldown()
    {
        canTrigger = false;
        yield return new WaitForSeconds(cooldownTime);
        canTrigger = true;
    }
    
    // 可由子类重写的虚拟方法，用于处理碰撞逻辑
    protected virtual void OnCollisionDetected(GameObject collidedObject)
    {
        // 默认不做任何处理，由子类实现具体逻辑
        Debug.Log($"检测到与 {collidedObject.name} 的碰撞");
    }
    
    // 检测范围内的物体
    public Collider[] DetectObjectsInRange()
    {
        return Physics.OverlapSphere(transform.position, detectionRadius, collisionLayers);
    }
    
    // 在Scene视图中可视化检测范围
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, detectionRadius);
    }
}`);
      } else {
        setGeneratedCode(`using UnityEngine;
using System.Collections.Generic;

// 这是根据您的描述生成的基础代码框架
public class GameManager : MonoBehaviour
{
    // 单例模式
    private static GameManager _instance;
    public static GameManager Instance => _instance;

    [Header("游戏设置")]
    [SerializeField] private bool enableDebugMode = false;
    [SerializeField] private int targetFrameRate = 60;

    [Header("系统引用")]
    [SerializeField] private UIManager uiManager;
    [SerializeField] private AudioManager audioManager;
    
    // 游戏状态
    private GameState currentState = GameState.MainMenu;
    
    // 事件系统
    private Dictionary<string, System.Action> eventCallbacks = 
        new Dictionary<string, System.Action>();
    
    // 游戏状态枚举
    public enum GameState
    {
        MainMenu,
        Playing,
        Paused,
        GameOver,
        Victory
    }
    
    private void Awake()
    {
        // 单例实现
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
        
        // 初始化游戏设置
        Application.targetFrameRate = targetFrameRate;
    }
    
    private void Start()
    {
        InitializeGame();
    }
    
    private void InitializeGame()
    {
        Debug.Log("游戏初始化...");
        
        // 初始化各系统
        if (uiManager == null)
        {
            Debug.LogWarning("UI Manager未设置!");
        }
        
        if (audioManager == null)
        {
            Debug.LogWarning("Audio Manager未设置!");
        }
        
        // 触发游戏初始化完成事件
        TriggerEvent("GameInitialized");
    }
    
    // 切换游戏状态
    public void ChangeState(GameState newState)
    {
        if (currentState == newState) return;
        
        // 退出当前状态
        switch (currentState)
        {
            case GameState.Playing:
                Time.timeScale = 0f; // 暂停游戏时间
                break;
                
            case GameState.Paused:
                Time.timeScale = 1f; // 恢复游戏时间
                break;
        }
        
        // 进入新状态
        switch (newState)
        {
            case GameState.MainMenu:
                // 显示主菜单
                if (uiManager != null)
                {
                    uiManager.ShowMainMenu();
                }
                break;
                
            case GameState.Playing:
                // 开始游戏
                Time.timeScale = 1f;
                break;
                
            case GameState.Paused:
                // 暂停游戏
                Time.timeScale = 0f;
                if (uiManager != null)
                {
                    uiManager.ShowPauseMenu();
                }
                break;
                
            case GameState.GameOver:
                // 游戏结束
                if (uiManager != null)
                {
                    uiManager.ShowGameOverScreen();
                }
                break;
                
            case GameState.Victory:
                // 游戏胜利
                if (uiManager != null)
                {
                    uiManager.ShowVictoryScreen();
                }
                break;
        }
        
        // 更新当前状态
        currentState = newState;
        
        // 触发状态改变事件
        TriggerEvent("GameStateChanged");
        
        if (enableDebugMode)
        {
            Debug.Log($"游戏状态改变: {currentState}");
        }
    }
    
    // 事件系统方法
    public void RegisterEvent(string eventName, System.Action callback)
    {
        if (!eventCallbacks.ContainsKey(eventName))
        {
            eventCallbacks[eventName] = callback;
        }
        else
        {
            eventCallbacks[eventName] += callback;
        }
    }
    
    public void UnregisterEvent(string eventName, System.Action callback)
    {
        if (eventCallbacks.ContainsKey(eventName))
        {
            eventCallbacks[eventName] -= callback;
        }
    }
    
    public void TriggerEvent(string eventName)
    {
        if (eventCallbacks.ContainsKey(eventName))
        {
            eventCallbacks[eventName]?.Invoke();
        }
    }
    
    // 游戏数据保存/加载示例
    public void SaveGame()
    {
        // TODO: 实现游戏数据保存逻辑
        Debug.Log("保存游戏数据");
    }
    
    public void LoadGame()
    {
        // TODO: 实现游戏数据加载逻辑
        Debug.Log("加载游戏数据");
    }
}`);
      }
      
      setIsGenerating(false);
    }, 1500);
  };
  
  // 处理代码类型变更
  const handleCodeTypeChange = (value: string) => {
    setCodeType(value as 'csharp' | 'js' | 'cpp');
  };
  
  return (
			<div className="grid grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
				{/* 左侧 - 聊天界面 */}
				<div className="col-span-1 overflow-hidden flex flex-col">
					<ChatInterface onSendMessage={handleGenerateCode} />
				</div>

				{/* 右侧 - 代码编辑器 */}
				<div className="col-span-2 border rounded-lg overflow-hidden flex flex-col">
					<div className="p-3 border-b bg-card flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Code className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium">生成的代码</span>
						</div>

						<div className="flex items-center space-x-2">
							<Select
								defaultValue="csharp"
								onValueChange={handleCodeTypeChange}
							>
								<SelectTrigger className="w-[150px] h-8">
									<SelectValue placeholder="选择语言" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="csharp">C# (Unity)</SelectItem>
									<SelectItem value="cpp">C++ (Unreal)</SelectItem>
									<SelectItem value="js">JavaScript (Web)</SelectItem>
								</SelectContent>
							</Select>

							<Button
								variant="outline"
								size="sm"
								disabled={isGenerating}
								onClick={() => setGeneratedCode("// 代码已清除\n")}
							>
								<RefreshCw className="h-4 w-4 mr-1" />
								清除
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={copyToClipboard}
								disabled={!generatedCode.trim() || copyStatus === "copied"}
							>
								{copyStatus === "idle" ? (
									<Copy className="h-4 w-4 mr-1" />
								) : (
									<Check className="h-4 w-4 mr-1" />
								)}
								{copyStatus === "idle" ? "复制" : "已复制"}
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={() => alert("下载功能即将推出")}
							>
								<Download className="h-4 w-4 mr-1" />
								下载
							</Button>
						</div>
					</div>

					<div className="flex-1 overflow-auto">
						<CodeEditorTabs code={generatedCode} language={codeType} />
					</div>
				</div>
			</div>
		);
};

export default CodeGenerator; 