import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Shield, Users } from 'lucide-react';
import { Button } from './ui/button';

export const WalletConnect = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  if (isConnected) {
    return (
      <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-tactical text-foreground">Squad Formation Active</h3>
              <p className="text-sm text-muted-foreground">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <ConnectButton 
            chainStatus="icon"
            accountStatus="avatar"
            showBalance={false}
          />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {chain?.name || 'Unknown Network'}
          </Badge>
          {balance && (
            <Badge variant="outline" className="text-xs">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="font-tactical">
            <Users className="w-4 h-4 mr-2" />
            Create Squad
          </Button>
          <Button variant="outline" size="sm" className="font-tactical">
            Join Squad
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical">
      <div className="text-center">
        <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-tactical text-foreground mb-2">Connect Wallet to Form Squad</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Secure your strategies with decentralized authentication
        </p>
        <ConnectButton 
          chainStatus="icon"
          accountStatus="full"
          showBalance={true}
        />
      </div>
    </Card>
  );
};