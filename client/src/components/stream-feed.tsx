import { motion } from "framer-motion";
import { MapPin, Brain, Wallet, HeartPulse, FileText, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

const MOCK_EVENTS = [
  {
    id: 1,
    type: "biometric",
    icon: HeartPulse,
    title: "Elevated Heart Rate",
    desc: "124 BPM - Intense Focus detected",
    time: "2 min ago",
    color: "text-red-400",
    borderColor: "border-red-500/20"
  },
  {
    id: 2,
    type: "location",
    icon: MapPin,
    title: "Location Changed",
    desc: "Arrived at Neural Interface Lab, Sector 4",
    time: "15 min ago",
    color: "text-primary",
    borderColor: "border-primary/20"
  },
  {
    id: 3,
    type: "finance",
    icon: Wallet,
    title: "Transaction Encrypted",
    desc: "0.45 BTC - Coffee & Nootropics",
    time: "42 min ago",
    color: "text-amber-400",
    borderColor: "border-amber-500/20"
  },
  {
    id: 4,
    type: "thought",
    icon: Brain,
    title: "Idea Captured",
    desc: "'Quantum entanglement for data persistence...'",
    time: "1 hour ago",
    color: "text-purple-400",
    borderColor: "border-purple-500/20"
  }
];

export default function StreamFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-mono font-bold text-muted-foreground tracking-widest uppercase">
          Live Stream
        </h2>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-mono text-primary">RECORDING</span>
        </div>
      </div>

      <div className="relative border-l border-border/50 ml-3 space-y-8 pb-8">
        {MOCK_EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8"
          >
            <div className={`absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-background border-2 ${event.color.replace('text-', 'border-')} z-10`} />
            
            <Card className={`p-4 bg-card/50 backdrop-blur-sm border ${event.borderColor} hover:bg-card/80 transition-colors group cursor-pointer`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md bg-background/50 ${event.color}`}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {event.desc}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/70 whitespace-nowrap">
                  {event.time}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
