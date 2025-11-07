import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Upload from "@/pages/Upload";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import PostDetail from "@/pages/PostDetail";
import Auth from "@/pages/Auth";
import Landing from "@/pages/Landing";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/upload" component={Upload} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/auth" component={Auth} />
      <Route path="/landing" component={Landing} />
      <Route path="/onboarding" component={Onboarding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
