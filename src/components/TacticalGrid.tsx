import { useEffect, useState } from 'react';

export const TacticalGrid = () => {
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 20);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {/* Grid pattern */}
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--tactical-grid)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--tactical-grid)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Scanning line */}
      <div 
        className="absolute left-0 w-full h-0.5 bg-primary shadow-encrypted transition-all duration-150"
        style={{ top: `${scanLine * 5}%` }}
      />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary"></div>
    </div>
  );
};