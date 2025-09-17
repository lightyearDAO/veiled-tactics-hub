import { useState } from 'react';
import { TacticalGrid } from '@/components/TacticalGrid';
import { TacticalLogo } from '@/components/TacticalLogo';
import { WalletConnect } from '@/components/WalletConnect';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Shield, Plus, Search, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const Squad = () => {
  const { isConnected, address } = useAccount();
  const [squadName, setSquadName] = useState('');
  const [squadCode, setSquadCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const handleCreateSquad = async () => {
    if (!squadName.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate squad creation success
      alert(`Squad "${squadName}" created successfully! Share code: TACT-${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
      setCreateDialogOpen(false);
      setSquadName('');
    }, 1500);
  };

  const handleJoinSquad = async () => {
    if (!squadCode.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate squad join success
      alert(`Successfully joined squad with code: ${squadCode}`);
      setJoinDialogOpen(false);
      setSquadCode('');
    }, 1500);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <TacticalGrid />
        
        <header className="relative z-10 p-6 border-b border-border/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <TacticalLogo size={40} />
              <div>
                <h1 className="text-xl font-tactical text-foreground">Battle Command</h1>
                <p className="text-xs text-muted-foreground font-tactical">Tactical Operations</p>
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
            <WalletConnect />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <TacticalGrid />
      
      <header className="relative z-10 p-6 border-b border-border/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <TacticalLogo size={40} />
            <div>
              <h1 className="text-xl font-tactical text-foreground">Battle Command</h1>
              <p className="text-xs text-muted-foreground font-tactical">Squad Operations</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-tactical text-accent border-accent/50">
              <Shield className="w-3 h-3 mr-1" />
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Badge>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <section className="text-center py-8">
            <h2 className="text-3xl font-tactical text-foreground mb-4 animate-fade-in">
              Squad Operations Center
            </h2>
            <p className="text-muted-foreground font-tactical max-w-2xl mx-auto animate-fade-in">
              Form tactical squads with encrypted communication or join existing operations
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            {/* Create Squad Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical hover:shadow-encrypted transition-all duration-300 cursor-pointer group hover:scale-[1.02]">
                  <div className="p-3 bg-accent/20 rounded-lg w-fit mb-4 group-hover:bg-accent/30 transition-colors">
                    <Plus className="w-6 h-6 text-accent animate-pulse" />
                  </div>
                  <h3 className="text-xl font-tactical text-foreground mb-2 group-hover:text-accent transition-colors">
                    Create New Squad
                  </h3>
                  <p className="text-muted-foreground font-tactical text-sm mb-4">
                    Establish a new tactical unit with encrypted communication channels
                  </p>
                  <Button className="w-full font-tactical bg-accent hover:bg-accent/90 text-accent-foreground group-hover:shadow-glow-pulse">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Squad
                  </Button>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-gradient-tactical border-accent/20 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-tactical text-foreground">
                    <div className="p-2 bg-accent/20 rounded-lg animate-glow-pulse">
                      <Plus className="w-6 h-6 text-accent" />
                    </div>
                    Create Elite Squad
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="relative">
                    <label className="block text-sm font-tactical text-accent mb-3 uppercase tracking-wider">
                      Squad Designation
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Enter elite squad name..."
                        value={squadName}
                        onChange={(e) => setSquadName(e.target.value)}
                        className="font-tactical bg-background/50 border-accent/30 focus:border-accent text-foreground placeholder:text-muted-foreground h-12 text-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-encrypted opacity-10 rounded-md pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleCreateSquad}
                      disabled={!squadName.trim() || isLoading}
                      className="flex-1 font-tactical bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg shadow-tactical hover:shadow-glow-pulse transition-all"
                    >
                      {isLoading ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Deploy Squad
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Join Squad Dialog */}
            <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical hover:shadow-encrypted transition-all duration-300 cursor-pointer group hover:scale-[1.02]">
                  <div className="p-3 bg-primary/20 rounded-lg w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                    <Search className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-tactical text-foreground mb-2 group-hover:text-primary transition-colors">
                    Join Existing Squad
                  </h3>
                  <p className="text-muted-foreground font-tactical text-sm mb-4">
                    Enter a squad code to join an established tactical unit
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full font-tactical border-primary/50 text-primary hover:bg-primary/10 group-hover:shadow-glow-pulse"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Join Mission
                  </Button>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-gradient-tactical border-primary/20 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-tactical text-foreground">
                    <div className="p-2 bg-primary/20 rounded-lg animate-glow-pulse">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    Join Elite Squad
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="relative">
                    <label className="block text-sm font-tactical text-primary mb-3 uppercase tracking-wider">
                      Access Code
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Enter tactical access code..."
                        value={squadCode}
                        onChange={(e) => setSquadCode(e.target.value.toUpperCase())}
                        className="font-tactical bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground h-12 text-lg uppercase tracking-widest"
                      />
                      <div className="absolute inset-0 bg-gradient-encrypted opacity-10 rounded-md pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleJoinSquad}
                      disabled={!squadCode.trim() || isLoading}
                      className="flex-1 font-tactical bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg shadow-tactical hover:shadow-glow-pulse transition-all"
                    >
                      {isLoading ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Join Mission
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Squad;