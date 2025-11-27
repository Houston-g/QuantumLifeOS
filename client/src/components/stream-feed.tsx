import { motion } from "framer-motion";
import { MapPin, Brain, Wallet, HeartPulse, FileText, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEvents } from "@/hooks/use-events";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const EVENT_ICONS: Record<string, any> = {
  biometric: HeartPulse,
  location: MapPin,
  finance: Wallet,
  thought: Brain,
  document: FileText,
  media: Music,
};

const EVENT_COLORS: Record<string, { color: string; borderColor: string }> = {
  biometric: { color: "text-red-400", borderColor: "border-red-500/20" },
  location: { color: "text-primary", borderColor: "border-primary/20" },
  finance: { color: "text-amber-400", borderColor: "border-amber-500/20" },
  thought: { color: "text-purple-400", borderColor: "border-purple-500/20" },
  document: { color: "text-blue-400", borderColor: "border-blue-500/20" },
  media: { color: "text-green-400", borderColor: "border-green-500/20" },
};

export default function StreamFeed() {
  const { data: events, isLoading } = useEvents(20);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-mono font-bold text-muted-foreground tracking-widest uppercase">
            Live Stream
          </h2>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

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

      {events && events.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground font-mono text-sm">
          No events recorded yet. Start capturing your life moments.
        </div>
      ) : (
        <div className="relative border-l border-border/50 ml-3 space-y-8 pb-8">
          {events?.map((event, idx) => {
            const Icon = EVENT_ICONS[event.type] || Brain;
            const colors = EVENT_COLORS[event.type] || EVENT_COLORS.thought;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-8"
                data-testid={`event-${event.id}`}
              >
                <div className={`absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-background border-2 ${colors.color.replace('text-', 'border-')} z-10`} />
                
                <Card className={`p-4 bg-card/50 backdrop-blur-sm border ${colors.borderColor} hover:bg-card/80 transition-colors group cursor-pointer`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-md bg-background/50 ${colors.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/70 whitespace-nowrap">
                      {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
