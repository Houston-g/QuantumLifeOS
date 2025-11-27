import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Activity, Database, Search, Settings, Menu, Disc } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import bgImage from "@assets/generated_images/dark_quantum_encryption_background_texture.png";
import { useMetrics } from "@/hooks/use-events";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: metrics } = useMetrics();

  const navItems = [
    { icon: Activity, label: "Stream", path: "/" },
    { icon: Database, label: "Archive", path: "/archive" },
    { icon: Shield, label: "Security", path: "/security" },
    { icon: Settings, label: "System", path: "/settings" },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full py-6 space-y-8">
      <div className="px-6 flex items-center space-x-3">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
          <Disc className="w-8 h-8 text-primary relative z-10 animate-[spin_10s_linear_infinite]" />
        </div>
        <span className="font-mono font-bold text-xl tracking-wider text-foreground">
          LIFE<span className="text-primary">OS</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
                data-testid={`nav-${item.path}`}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--primary)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-6">
        <div className="p-4 rounded-lg bg-card border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10">
            <div className="text-xs text-muted-foreground font-mono mb-2">STORAGE</div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-primary shadow-[0_0_10px_var(--primary)]" 
                style={{ width: `${metrics?.storagePercentage || 82}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-foreground/80">
              <span>{metrics?.storageUsedTb || 14}.2 TB</span>
              <span>{metrics?.storagePercentage || 82}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen w-full bg-background text-foreground overflow-hidden flex"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(5,5,10,0.95), rgba(5,5,10,0.9)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border/40 bg-background/50 backdrop-blur-xl h-screen sticky top-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
           <Disc className="w-6 h-6 text-primary animate-[spin_10s_linear_infinite]" />
           <span className="font-mono font-bold">LIFE<span className="text-primary">OS</span></span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="button-menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-background/95 backdrop-blur-xl border-r-border/40">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto h-screen md:pt-0 pt-16">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[60] bg-[length:100%_2px,3px_100%] opacity-20 mix-blend-overlay" />
        <div className="container mx-auto max-w-6xl p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
