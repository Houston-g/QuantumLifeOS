import { Search, Command, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import CreateEventDialog from "./create-event-dialog";

export default function OmniSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 rounded-lg opacity-20 blur transition duration-500 ${isFocused ? 'opacity-60' : ''}`} />
        
        <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-primary/20 rounded-lg shadow-2xl">
          <div className="pl-4 text-primary/50">
            <Command className="w-5 h-5" />
          </div>
          <Input
            className="h-14 border-none bg-transparent text-lg font-mono placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-foreground"
            placeholder="Search archive, retrieve moments, or execute commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            data-testid="input-omni-search"
          />
          <div className="pr-4 flex items-center space-x-2">
            <CreateEventDialog />
          </div>
        </div>
      </motion.div>
      
      {/* Helper Text */}
      <div className="flex justify-between mt-2 px-1">
        <div className="flex space-x-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span>CMD+K to focus</span>
          <span>/ for commands</span>
        </div>
        <div className="text-[10px] font-mono text-primary/60 animate-pulse">
          SYSTEM READY
        </div>
      </div>
    </div>
  );
}
