import { TacticalGrid } from '@/components/TacticalGrid';
import { TacticalLogo } from '@/components/TacticalLogo';
import { Shield, Target, Users, Zap, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <TacticalGrid />
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TacticalLogo size={48} />
            <div>
              <h1 className="text-2xl font-tactical text-foreground">Battle Command</h1>
              <p className="text-sm text-muted-foreground font-tactical">Private Battle Strategies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-tactical animate-glow-pulse">
              <Target className="w-3 h-3 mr-1" />
              Fog of War Active
            </Badge>
            <Button variant="outline" asChild className="font-tactical">
              <Link to="/squad">
                <Users className="w-4 h-4 mr-2" />
                Squad Operations
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <section className="text-center py-12">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-tactical text-foreground mb-4 animate-fade-in">
                ENCRYPTED WARFARE
              </h2>
              <div className="absolute inset-0 bg-gradient-encrypted opacity-50 -z-10"></div>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-tactical">
              Plan your strategies in complete secrecy. Enemy teams cannot spy on your tactics until execution.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Card className="p-4 bg-gradient-tactical border-border/50 shadow-tactical">
                <div className="flex items-center gap-2 text-primary">
                  <Lock className="w-5 h-5" />
                  <span className="font-tactical text-sm">End-to-End Encryption</span>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-tactical border-border/50 shadow-tactical">
                <div className="flex items-center gap-2 text-accent">
                  <Zap className="w-5 h-5" />
                  <span className="font-tactical text-sm">Real-time Execution</span>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-tactical border-border/50 shadow-tactical">
                <div className="flex items-center gap-2 text-destructive">
                  <Target className="w-5 h-5" />
                  <span className="font-tactical text-sm">Tactical Advantage</span>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="font-tactical bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/squad">
                  Start Operations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-tactical" asChild>
                <Link to="/wallet-test">
                  Test Wallet
                </Link>
              </Button>
            </div>
          </section>


          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-6 py-12">
            <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical">
              <div className="p-3 bg-primary/20 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-tactical text-foreground mb-2">Military-Grade Security</h3>
              <p className="text-muted-foreground font-tactical text-sm">
                Your strategies are protected with advanced encryption protocols
              </p>
            </Card>

            <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical">
              <div className="p-3 bg-accent/20 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-tactical text-foreground mb-2">Squad Coordination</h3>
              <p className="text-muted-foreground font-tactical text-sm">
                Seamlessly coordinate with your team while maintaining operational security
              </p>
            </Card>

            <Card className="p-6 bg-gradient-tactical border-border/50 shadow-tactical">
              <div className="p-3 bg-destructive/20 rounded-lg w-fit mb-4">
                <Target className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-tactical text-foreground mb-2">Tactical Superiority</h3>
              <p className="text-muted-foreground font-tactical text-sm">
                Gain the upper hand with strategies hidden until the perfect moment
              </p>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
