import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Activity,
  Phone,
  Globe
} from "lucide-react";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    plan: string;
    joinDate: string;
    status: string;
  } | null;
}

const UserManagementModal = ({ isOpen, onClose, user }: UserManagementModalProps) => {
  if (!user) return null;

  // Mock detailed user data
  const userDetails = {
    ...user,
    email: `contact@${user.name.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: "+1 (555) 123-4567",
    website: `https://${user.name.toLowerCase().replace(/\s+/g, '')}.com`,
    postsGenerated: 145,
    postsLimit: user.plan === "Professional" ? 200 : 100,
    billingAmount: user.plan === "Professional" ? "$1,000" : "$500",
    nextBilling: "2024-02-15",
    socialPlatforms: ["Instagram", "LinkedIn", "Facebook"],
    recentActivity: [
      { action: "Generated new post", time: "2 hours ago" },
      { action: "Updated brand assets", time: "1 day ago" },
      { action: "Scheduled 5 posts", time: "2 days ago" },
      { action: "Connected Instagram account", time: "3 days ago" }
    ],
    billingHistory: [
      { date: "2024-01-15", amount: user.plan === "Professional" ? "$1,000" : "$500", status: "Paid" },
      { date: "2023-12-15", amount: user.plan === "Professional" ? "$1,000" : "$500", status: "Paid" },
      { date: "2023-11-15", amount: user.plan === "Professional" ? "$1,000" : "$500", status: "Paid" }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Management - {user.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{userDetails.name}</p>
                      <p className="text-xs text-muted-foreground">Business Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{userDetails.email}</p>
                      <p className="text-xs text-muted-foreground">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{userDetails.phone}</p>
                      <p className="text-xs text-muted-foreground">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{userDetails.website}</p>
                      <p className="text-xs text-muted-foreground">Website</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Account Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan</span>
                    <Badge className="status-approved">{userDetails.plan}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className={userDetails.status === 'active' ? 'status-approved' : 'status-review'}>
                      {userDetails.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Join Date</span>
                    <span className="text-sm">{userDetails.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Connected Platforms</span>
                    <span className="text-sm">{userDetails.socialPlatforms.length}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Connected Platforms */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Social Media</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {userDetails.socialPlatforms.map(platform => (
                  <div key={platform} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Activity className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{platform}</p>
                      <Badge className="status-approved text-xs">Connected</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Usage Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Posts Generated This Month</span>
                      <span>{userDetails.postsGenerated}/{userDetails.postsLimit}</span>
                    </div>
                    <Progress value={(userDetails.postsGenerated / userDetails.postsLimit) * 100} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{userDetails.postsGenerated}</p>
                      <p className="text-sm text-muted-foreground">Total Posts</p>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-lg">
                      <p className="text-2xl font-bold text-success">{userDetails.postsLimit - userDetails.postsGenerated}</p>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Platform Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Platform Usage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Instagram</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-sm">80%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">LinkedIn</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-12 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Facebook</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-8 h-2 bg-success rounded-full"></div>
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Subscription */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Subscription</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plan</span>
                    <Badge className="status-approved">{userDetails.plan}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Amount</span>
                    <span className="text-sm font-semibold">{userDetails.billingAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Billing</span>
                    <span className="text-sm">{userDetails.nextBilling}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge className="status-approved">Active</Badge>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Billing Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Upgrade/Downgrade Plan
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Pause Subscription
                  </Button>
                </div>
              </Card>
            </div>

            {/* Billing History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Billing History</h3>
              <div className="space-y-3">
                {userDetails.billingHistory.map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{userDetails.plan} Plan</p>
                      <p className="text-xs text-muted-foreground">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{bill.amount}</p>
                      <Badge className="status-approved text-xs">{bill.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {userDetails.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="btn-hero">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;