'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { NPC } from './types';

interface NPCSelectDialogProps {
  npcs: NPC[];
  onSelect: (npc: NPC) => void;
  onClose: () => void;
}

export function NPCSelectDialog({ npcs, onSelect, onClose }: NPCSelectDialogProps) {
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);
  
  // 选择NPC并关闭对话框
  const handleSelect = () => {
    if (selectedNpcId) {
      const selectedNpc = npcs.find(npc => npc.id === selectedNpcId);
      if (selectedNpc) {
        onSelect(selectedNpc);
      }
    }
  };
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>选择NPC进行对话</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {npcs.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">
              暂无可用的NPC角色
            </div>
          ) : (
            <RadioGroup value={selectedNpcId || ''} onValueChange={setSelectedNpcId}>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {npcs.map(npc => (
                  <div key={npc.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/10 cursor-pointer">
                    <RadioGroupItem 
                      value={npc.id} 
                      id={`npc-${npc.id}`}
                      className="mt-1"
                    />
                    <div className="flex flex-1 items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {npc.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Label 
                          htmlFor={`npc-${npc.id}`}
                          className="text-base font-medium cursor-pointer"
                        >
                          {npc.name}
                        </Label>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {npc.description}
                        </p>
                        {npc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {npc.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="px-2 py-0.5 bg-muted text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button 
            onClick={handleSelect} 
            disabled={!selectedNpcId}
          >
            开始对话
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 