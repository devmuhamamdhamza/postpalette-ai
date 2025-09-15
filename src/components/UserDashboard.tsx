import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Plus, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  CreditCard,
  Bell,
  Settings,
  BarChart3
} from "lucide-react";

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data
  const posts = [
    {
      id: 1,
      title: "Summer Campaign Launch",
      status: "scheduled",
      scheduledDate: "2024-01-15",
      platform: "Instagram",
      revisions: 0
    },
    {
      id: 2,
      title: "Product Feature Highlight",
      status: "approved",
      scheduledDate: "2024-01-16",
      platform: "LinkedIn",
      revisions: 1
    },
    {
      id: 3,
      title: "Customer Success Story",
      status: "review",
      scheduledDate: "2024-01-17",
      platform: "Facebook",
      revisions: 2
    },
    {
      id: 4,
      title: "Industry Insights Post",
      status: "draft",
      scheduledDate: "2024-01-18",
      platform: "Twitter",
      revisions: 0
    }
  ];

  const subscription = {
    plan: "Professional",
    postsUsed: 28,
    postsLimit: 40,
    nextBilling: "2024-02-15",
    amount: "$1,000"
  };

  const notifications = [
    {
      id: 1,
      type: "approval",
      message: "Post 'Summer Campaign Launch' approved and scheduled",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "revision",
      message: "Revision requested for 'Product Feature Highlight'",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "complete",
      message: "Content generation completed for 3 new posts",
      time: "1 day ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="status-draft">Draft</Badge>;
      case 'review':
        return <Badge className="status-review">In Review</Badge>;
      case 'approved':
        return <Badge className="status-approved">Approved</Badge>;
      case 'scheduled':
        return <Badge className="status-scheduled">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">Content Dashboard</h1>
            <p className="text-muted-foreground">Manage your social media content pipeline</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button className="btn-hero">
              <Plus className="h-4 w-4 mr-2" />
              Request Content
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts This Month</p>
                <p className="text-2xl font-bold">{subscription.postsUsed}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'scheduled').length}</p>
              </div>
              <Calendar className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'review').length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'draft').length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
                <TabsTrigger value="posts">Post Status</TabsTrigger>
                <TabsTrigger value="assets">Brand Assets</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Content Calendar</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-3 text-center font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = i + 1;
                      const hasPost = date <= 20 && date % 3 === 0;
                      return (
                        <div 
                          key={i} 
                          className={`p-3 h-20 border rounded-lg cursor-pointer transition-colors hover:bg-accent/10 ${
                            hasPost ? 'bg-accent/5 border-accent/20' : 'border-border'
                          }`}
                        >
                          <div className="text-sm">{date <= 31 ? date : ''}</div>
                          {hasPost && (
                            <div className="w-2 h-2 bg-accent rounded-full mt-1"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} className="p-6 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(post.status)}
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {post.platform} • {post.scheduledDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {post.revisions > 0 && (
                          <Badge variant="outline">{post.revisions} revisions</Badge>
                        )}
                        {getStatusBadge(post.status)}
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="assets">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Brand Assets</h3>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Assets
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Logo.png', 'Brand Colors.pdf', 'Style Guide.pdf'].map(asset => (
                      <div key={asset} className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer">
                        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">{asset}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Status */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">Subscription</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Posts Used</span>
                    <span>{subscription.postsUsed}/{subscription.postsLimit}</span>
                  </div>
                  <Progress value={(subscription.postsUsed / subscription.postsLimit) * 100} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Plan: {subscription.plan}</p>
                  <p>Next billing: {subscription.nextBilling}</p>
                  <p>Amount: {subscription.amount}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
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
                  <Plus className="h-4 w-4 mr-2" />
                  Request New Content
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Brand Assets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;