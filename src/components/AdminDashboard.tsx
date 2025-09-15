import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Brain,
  Edit3,
  Eye,
  History,
  RefreshCw,
  Filter,
  Search
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data for admin tasks
  const tasks = [
    {
      id: 1,
      title: "Summer Campaign Launch",
      client: "TechCorp Inc.",
      status: "review",
      priority: "high",
      submittedDate: "2024-01-14",
      dueDate: "2024-01-15",
      platform: "Instagram",
      contentType: "Carousel Post",
      revisionCount: 0,
      aiPrompt: "Create engaging summer campaign content highlighting our new product features with bright, energetic tone"
    },
    {
      id: 2,
      title: "Product Feature Highlight",
      client: "StartupXYZ",
      status: "needs_edit",
      priority: "medium",
      submittedDate: "2024-01-13",
      dueDate: "2024-01-16",
      platform: "LinkedIn",
      contentType: "Single Post",
      revisionCount: 1,
      aiPrompt: "Professional LinkedIn post about new software features, business-focused tone"
    },
    {
      id: 3,
      title: "Customer Success Story",
      client: "Enterprise Co",
      status: "ready",
      priority: "low",
      submittedDate: "2024-01-12",
      dueDate: "2024-01-17",
      platform: "Facebook",
      contentType: "Video Post",
      revisionCount: 2,
      aiPrompt: "Customer testimonial content, emotional and inspiring tone"
    },
    {
      id: 4,
      title: "Industry Insights",
      client: "ConsultingPro",
      status: "review",
      priority: "medium",
      submittedDate: "2024-01-11",
      dueDate: "2024-01-18",
      platform: "Twitter",
      contentType: "Thread",
      revisionCount: 0,
      aiPrompt: "Industry analysis thread, thought leadership tone with data points"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'review':
        return <Badge className="status-review">Needs Review</Badge>;
      case 'needs_edit':
        return <Badge className="status-draft">Needs Edit</Badge>;
      case 'ready':
        return <Badge className="status-approved">Ready for User</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'needs_edit':
        return <AlertTriangle className="h-4 w-4" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Review and manage content creation tasks</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="btn-hero">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Queue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'review').length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Edits</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'needs_edit').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready for User</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'ready').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task Queue */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Task Queue</h2>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search tasks..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {tasks.map(task => (
                  <Card key={task.id} className="p-4 hover-lift cursor-pointer" 
                        onClick={() => setSelectedTask(task)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(task.status)}
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.client} • {task.platform} • {task.contentType}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                            {task.revisionCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {task.revisionCount} revisions
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium capitalize ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Task Details & AI Interface */}
          <div className="space-y-6">
            {selectedTask ? (
              <>
                {/* Task Details */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Task Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Title:</span>
                      <p className="text-sm">{selectedTask.title}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Client:</span>
                      <p className="text-sm">{selectedTask.client}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Platform:</span>
                      <p className="text-sm">{selectedTask.platform}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Content Type:</span>
                      <p className="text-sm">{selectedTask.contentType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                      <p className={`text-sm capitalize ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* AI Prompt Interface */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold">AI Content Generation</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Current Prompt:</label>
                      <Textarea 
                        value={selectedTask.aiPrompt}
                        className="text-sm" 
                        rows={3}
                        readOnly
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Prompt
                      </Button>
                      <Button className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Content Preview & Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Content Preview</h3>
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <p className="text-sm italic text-muted-foreground">
                      AI-generated content would appear here...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full btn-hero">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Send to User
                    </Button>
                    <Button variant="outline" className="w-full">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Request Changes
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview in Canva
                    </Button>
                  </div>
                </Card>

                {/* Revision History */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Revision History</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Version 1.0</p>
                      <p className="text-muted-foreground">Initial generation - Jan 14, 2:30 PM</p>
                    </div>
                    {selectedTask.revisionCount > 0 && (
                      <div className="text-sm">
                        <p className="font-medium">Version 1.1</p>
                        <p className="text-muted-foreground">Client requested tone adjustment - Jan 14, 4:15 PM</p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-6">
                <div className="text-center text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a task from the queue to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;