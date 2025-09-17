import { WalletTest } from '@/components/WalletTest';
import { TacticalGrid } from '@/components/TacticalGrid';
import { TacticalLogo } from '@/components/TacticalLogo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WalletTestPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <TacticalGrid />
      
      <header className="relative z-10 p-6 border-b border-border/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <TacticalLogo size={40} />
            <div>
              <h1 className="text-xl font-tactical text-foreground">Wallet Test</h1>
              <p className="text-xs text-muted-foreground font-tactical">Connection Debug</p>
            </div>
          </Link>
          
          <Button variant="outline" asChild className="font-tactical">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <div className="max-w-2xl mx-auto mt-20">
          <WalletTest />
        </div>
      </main>
    </div>
  );
};

export default WalletTestPage;
