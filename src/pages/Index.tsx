import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, setUser, setSession, setTokens } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch tokens after auth state changes
        if (session?.user) {
          setTimeout(() => {
            fetchUserTokens(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserTokens(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, setTokens]);

  const fetchUserTokens = async (userId: string) => {
    const { data } = await supabase
      .from("tokens")
      .select("balance")
      .eq("user_id", userId)
      .single();
    
    if (data) {
      setTokens(data.balance);
    }
  };

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="gradient-hero h-24 w-24 rounded-3xl shadow-glow mx-auto mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-gradient">Welcome to WorkHub</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your retro-modern marketplace for creative projects & freelance opportunities
            </p>
            <Button 
              size="lg" 
              className="gradient-primary shadow-glow text-lg px-8"
              onClick={() => navigate("/auth")}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Search */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Next <span className="text-gradient">Amazing Project</span>
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for jobs, skills, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary shadow-card"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Available Jobs</h2>
          </div>
          <Button asChild variant="outline">
            <a href="/dashboard">Post a Job</a>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                description={job.description}
                budgetMin={Number(job.budget_min)}
                budgetMax={Number(job.budget_max)}
                category={job.category}
                skills={job.skills || []}
                createdAt={job.created_at}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or check back later!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
