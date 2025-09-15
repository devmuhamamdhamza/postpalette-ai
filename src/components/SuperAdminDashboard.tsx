import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  TrendingUp,
  UserPlus,
  Settings,
  Shield,
  Activity,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const SuperAdminDashboard = () => {
  // Mock data for super admin
  const stats = {
    totalUsers: 247,
    activeSubscriptions: 189,
    monthlyRevenue: 187500,
    totalPosts: 3420,
    adminUsers: 8,
    activeProjects: 156
  };

  const recentUsers = [
    { id: 1, name: "TechCorp Inc.", plan: "Professional", joinDate: "2024-01-10", status: "active" },
    { id: 2, name: "StartupXYZ", plan: "Starter", joinDate: "2024-01-09", status: "active" },
    { id: 3, name: "Enterprise Co", plan: "Professional", joinDate: "2024-01-08", status: "trial" },
    { id: 4, name: "ConsultingPro", plan: "Starter", joinDate: "2024-01-07", status: "active" },
  ];

  const adminUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@contentai.com", role: "Senior Admin", tasksCompleted: 156, status: "active" },
    { id: 2, name: "Mike Chen", email: "mike@contentai.com", role: "Content Admin", tasksCompleted: 143, status: "active" },
    { id: 3, name: "Lisa Rodriguez", email: "lisa@contentai.com", role: "Content Admin", tasksCompleted: 128, status: "active" },
    { id: 4, name: "David Kim", email: "david@contentai.com", role: "Junior Admin", tasksCompleted: 89, status: "active" },
  ];

  const systemActivity = [
    { id: 1, type: "user_signup", message: "New user TechCorp Inc. signed up for Professional plan", time: "2 hours ago" },
    { id: 2, type: "admin_action", message: "Sarah Johnson completed 15 content reviews", time: "4 hours ago" },
    { id: 3, type: "billing", message: "Monthly billing processed for 189 active subscriptions", time: "6 hours ago" },
    { id: 4, type: "system", message: "System backup completed successfully", time: "8 hours ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <UserPlus className="h-4 w-4 text-success" />;
      case 'admin_action':
        return <Shield className="h-4 w-4 text-accent" />;
      case 'billing':
        return <DollarSign className="h-4 w-4 text-warning" />;
      case 'system':
        return <Settings className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">Super Admin Dashboard</h1>
            <p className="text-muted-foreground">System-wide oversight and management</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="btn-hero">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Admin User
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-warning" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts Generated</p>
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin Users</p>
                <p className="text-2xl font-bold">{stats.adminUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-accent" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{stats.activeProjects}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="admins">Admin Users</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent User Signups</h3>
                    <Input placeholder="Search users..." className="w-64" />
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.plan} Plan • Joined {user.joinDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={user.status === 'active' ? 'status-approved' : 'status-review'}>
                            {user.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="admins" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Admin Users</h3>
                    <Button className="btn-hero">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Admin
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {adminUsers.map(admin => (
                      <div key={admin.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{admin.name}</h4>
                            <p className="text-sm text-muted-foreground">{admin.email}</p>
                            <p className="text-sm text-muted-foreground">{admin.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{admin.tasksCompleted} tasks</p>
                            <Badge className="status-approved">Active</Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">System Analytics</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">User Growth (30 days)</p>
                        <div className="h-32 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg flex items-end justify-center">
                          <TrendingUp className="h-8 w-8 text-success mb-4" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Content Generation (30 days)</p>
                        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-center">
                          <BarChart3 className="h-8 w-8 text-primary mb-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Billing Overview</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <p className="text-2xl font-bold text-success">${(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{stats.activeSubscriptions}</p>
                      <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <p className="text-2xl font-bold text-warning">94.2%</p>
                      <p className="text-sm text-muted-foreground">Payment Success Rate</p>
                    </div>
                  </div>
                  <Button className="btn-hero w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Financial Report
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <Badge className="status-approved">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Jasper AI</span>
                  <Badge className="status-approved">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Canva Integration</span>
                  <Badge className="status-approved">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hootsuite</span>
                  <Badge className="status-approved">Synced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stripe Billing</span>
                  <Badge className="status-approved">Processing</Badge>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Activity</h3>
              <div className="space-y-4">
                {systemActivity.map(activity => (
                  <div key={activity.id} className="flex gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Admin User
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;