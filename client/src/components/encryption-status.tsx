import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

export default function EncryptionStatus() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-primary/5 animate-pulse" />
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center opacity-20"
      >
        <div className="w-48 h-48 border border-dashed border-primary rounded-full" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center opacity-20"
      >
        <div className="w-36 h-36 border border-dotted border-primary rounded-full" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 p-4 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(0,243,255,0.15)]">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          System Secure
        </h3>
        <div className="text-xs font-mono text-primary mt-1 flex items-center gap-2">
          <Lock className="w-3 h-3" />
          <span>POST-QUANTUM ENCRYPTION ACTIVE</span>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
          <div className="bg-background/50 p-2 rounded border border-border/50">
            <div className="text-[10px] text-muted-foreground uppercase">Keys</div>
            <div className="text-sm font-mono text-foreground">4096-bit</div>
          </div>
          <div className="bg-background/50 p-2 rounded border border-border/50">
            <div className="text-[10px] text-muted-foreground uppercase">Protocol</div>
            <div className="text-sm font-mono text-foreground">Kyber-1024</div>
          </div>
        </div>
      </div>
    </div>
  );
}
