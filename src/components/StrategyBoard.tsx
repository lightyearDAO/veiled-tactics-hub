import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Lock, Unlock, Target, Zap } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  isEncrypted: boolean;
  isRevealed: boolean;
  type: 'offensive' | 'defensive' | 'tactical';
}

export const StrategyBoard = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { id: '1', name: 'Alpha Strike', isEncrypted: true, isRevealed: false, type: 'offensive' },
    { id: '2', name: 'Shield Wall', isEncrypted: true, isRevealed: false, type: 'defensive' },
    { id: '3', name: 'Flanking Maneuver', isEncrypted: true, isRevealed: false, type: 'tactical' },
    { id: '4', name: 'Stealth Approach', isEncrypted: true, isRevealed: false, type: 'tactical' },
  ]);

  const toggleEncryption = (id: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id 
        ? { ...strategy, isEncrypted: !strategy.isEncrypted }
        : strategy
    ));
  };

  const revealStrategy = (id: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id 
        ? { ...strategy, isRevealed: true }
        : strategy
    ));
  };

  const getTypeIcon = (type: Strategy['type']) => {
    switch (type) {
      case 'offensive': return <Zap className="w-4 h-4" />;
      case 'defensive': return <Target className="w-4 h-4" />;
      case 'tactical': return <Eye className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Strategy['type']) => {
    switch (type) {
      case 'offensive': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'defensive': return 'bg-primary/20 text-primary border-primary/30';
      case 'tactical': return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-tactical text-foreground">Battle Strategies</h2>
        <Badge variant="outline" className="font-tactical">
          <Lock className="w-3 h-3 mr-1" />
          Encrypted
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {strategies.map((strategy) => (
          <Card 
            key={strategy.id} 
            className={`p-4 bg-gradient-tactical border-border/50 transition-all duration-300 ${
              strategy.isEncrypted ? 'shadow-encrypted animate-glow-pulse' : 'shadow-tactical'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getTypeIcon(strategy.type)}
                <h3 className={`font-tactical ${
                  strategy.isEncrypted && !strategy.isRevealed 
                    ? 'blur-sm text-muted-foreground' 
                    : 'text-foreground'
                }`}>
                  {strategy.isEncrypted && !strategy.isRevealed ? '████████████' : strategy.name}
                </h3>
              </div>
              <Badge className={`${getTypeColor(strategy.type)} font-tactical text-xs`}>
                {strategy.type}
              </Badge>
            </div>

            <div className={`text-sm mb-4 ${
              strategy.isEncrypted && !strategy.isRevealed 
                ? 'blur-sm text-muted-foreground' 
                : 'text-muted-foreground'
            }`}>
              {strategy.isEncrypted && !strategy.isRevealed 
                ? '████ ████████ ██ ███████ ████ ████████ ██████████ ████'
                : 'Detailed tactical information will be revealed during execution phase.'
              }
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleEncryption(strategy.id)}
                className="font-tactical"
              >
                {strategy.isEncrypted ? (
                  <>
                    <Unlock className="w-3 h-3 mr-1" />
                    Decrypt
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 mr-1" />
                    Encrypt
                  </>
                )}
              </Button>
              
              {strategy.isEncrypted && !strategy.isRevealed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => revealStrategy(strategy.id)}
                  className="font-tactical"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Execute
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};