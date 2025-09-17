import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Card } from './ui/card';

export const WalletTest = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Wallet Connection Test</h2>
      
      <div className="space-y-2 mb-4">
        <p><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
        <p><strong>Address:</strong> {address || 'Not connected'}</p>
        <p><strong>Chain:</strong> {chain?.name || 'Unknown'}</p>
        <p><strong>Balance:</strong> {balance ? `${balance.formatted} ${balance.symbol}` : 'N/A'}</p>
      </div>
      
      <ConnectButton />
    </Card>
  );
};
