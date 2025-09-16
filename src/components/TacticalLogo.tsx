import { Target, Radar, Grid3X3 } from 'lucide-react';

export const TacticalLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <Grid3X3 className="w-full h-full text-primary" strokeWidth={1} />
      </div>
      
      {/* Central radar sweep */}
      <div className="absolute inset-1 rounded-full border border-accent/50 animate-pulse">
        <Radar className="w-full h-full text-accent p-1" strokeWidth={1.5} />
      </div>
      
      {/* Target crosshair */}
      <div className="absolute inset-2">
        <Target className="w-full h-full text-primary animate-glow-pulse" strokeWidth={2} />
      </div>
      
      {/* Center dot */}
      <div className="absolute w-1 h-1 bg-destructive rounded-full animate-pulse" />
    </div>
  );
};