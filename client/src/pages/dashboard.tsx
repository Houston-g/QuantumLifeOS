import OmniSearch from "@/components/omni-search";
import StreamFeed from "@/components/stream-feed";
import EncryptionStatus from "@/components/encryption-status";
import { motion } from "framer-motion";
import { useMetrics } from "@/hooks/use-events";

export default function Dashboard() {
  const { data: metrics } = useMetrics();

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="py-8 md:py-12">
        <div className="text-center mb-8 space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
          >
            Welcome back, User.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-mono text-sm"
          >
            System is operating at 98% efficiency. {metrics?.eventsToday || 0} moments archived today.
          </motion.p>
        </div>
        <OmniSearch />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Stream */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-7 lg:col-span-8"
        >
          <StreamFeed />
        </motion.div>

        {/* Right Column: Widgets */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EncryptionStatus />
          </motion.div>

          {/* Stats Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
          >
            <h3 className="text-xs font-mono font-bold text-muted-foreground tracking-widest uppercase mb-4">
              Life Optimization
            </h3>
            <div className="space-y-4">
              {[
                { label: "Sleep Quality", val: "92%", color: "bg-primary" },
                { label: "Productivity", val: "78%", color: "bg-purple-500" },
                { label: "Physical Activity", val: "45%", color: "bg-amber-500" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{stat.label}</span>
                    <span className="font-mono">{stat.val}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stat.color} rounded-full`} 
                      style={{ width: stat.val }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
