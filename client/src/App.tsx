import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/archive" component={() => <div className="p-8 text-center text-muted-foreground font-mono">ARCHIVE MODULE LOCKED</div>} />
        <Route path="/security" component={() => <div className="p-8 text-center text-muted-foreground font-mono">SECURITY PROTOCOLS ACTIVE</div>} />
        <Route path="/settings" component={() => <div className="p-8 text-center text-muted-foreground font-mono">SYSTEM SETTINGS</div>} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
