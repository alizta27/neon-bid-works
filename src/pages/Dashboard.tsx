import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, ListOrdered, User } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your jobs, bids, and profile</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-card border-2 hover:shadow-hover transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <CardTitle>Active Jobs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-gradient">0</p>
                  <CardDescription>Jobs you're working on</CardDescription>
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 hover:shadow-hover transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ListOrdered className="h-5 w-5 text-secondary" />
                    <CardTitle>Total Bids</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-gradient">0</p>
                  <CardDescription>Proposals submitted</CardDescription>
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 hover:shadow-hover transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    <CardTitle>Profile</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-gradient">100%</p>
                  <CardDescription>Profile completion</CardDescription>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  No recent activity yet. Start by browsing jobs!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle>Your Jobs</CardTitle>
                <CardDescription>Jobs you've posted or applied to</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  No jobs yet. Visit the homepage to find opportunities!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Profile settings coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
