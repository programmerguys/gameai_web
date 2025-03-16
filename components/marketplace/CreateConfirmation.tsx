import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CreateConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelName: string;
  pointsRequired: number;
  userPoints: number;
  authorReward: number;
  onConfirm: () => void;
}

export function CreateConfirmation({
  open,
  onOpenChange,
  modelName,
  pointsRequired,
  userPoints,
  authorReward,
  onConfirm,
}: CreateConfirmationProps) {
  const hasEnoughPoints = userPoints >= pointsRequired;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>确认二次创作</DialogTitle>
          <DialogDescription>
            您将基于&ldquo;{modelName}&rdquo;进行二次创作，此操作需要消耗积分
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span>您的积分余额:</span>
            <span className="font-semibold">{userPoints} 积分</span>
          </div>
          
          <div className="flex justify-between items-center mb-3 text-sm">
            <span>所需积分:</span>
            <span className="font-semibold text-primary">{pointsRequired} 积分</span>
          </div>
          
          <div className="flex justify-between items-center mb-3 text-sm">
            <span>作者奖励:</span>
            <span className="font-semibold text-muted-foreground">{authorReward} 积分</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span>操作后余额:</span>
            <span className={`font-semibold ${hasEnoughPoints ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {hasEnoughPoints ? userPoints - pointsRequired : '积分不足'}
            </span>
          </div>
          
          {!hasEnoughPoints && (
            <div className="mt-4 p-3 border border-red-200 bg-red-50 text-red-800 dark:bg-red-900/30 dark:border-red-800/30 dark:text-red-400 rounded-md text-sm">
              您的积分不足，请先获取更多积分再进行此操作
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!hasEnoughPoints}
          >
            确认操作
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 