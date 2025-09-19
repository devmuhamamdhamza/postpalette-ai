import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Palette, 
  CreditCard, 
  FileText, 
  Upload,
  Eye,
  EyeOff,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock user data from onboarding
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@company.com",
    mobile: "+1 (555) 123-4567",
    businessName: "Tech Innovations Co.",
    goals: "Increase brand awareness and drive engagement through social media",
    websiteLink: "https://techinnovations.com",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    fontStyle: "modern",
    brandStyle: "professional",
    targetAudience: "Tech-savvy professionals aged 25-45",
    audienceAge: "25-34",
    audienceLocation: "United States",
    audienceInterests: "Technology, innovation, productivity tools",
    contentTypes: ["Informational", "Educational", "Promotional"],
    postingFrequency: "3-week",
    contentTone: "professional",
    holidays: ["Christmas", "New Year", "Thanksgiving"],
    customEvents: "Company anniversary in March, product launches quarterly"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const subscription = {
    plan: "Professional",
    postsUsed: 28,
    postsLimit: 40,
    nextBilling: "2024-02-15",
    amount: "$1,000",
    status: "Active"
  };

  const billingHistory = [
    { id: 1, date: "2024-01-15", amount: "$1,000", status: "Paid", description: "Professional Plan - Monthly" },
    { id: 2, date: "2023-12-15", amount: "$1,000", status: "Paid", description: "Professional Plan - Monthly" },
    { id: 3, date: "2023-11-15", amount: "$500", status: "Paid", description: "Starter Plan - Monthly" },
    { id: 4, date: "2023-10-15", amount: "$500", status: "Paid", description: "Starter Plan - Monthly" }
  ];

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log("Profile updated:", userProfile);
  };

  const handlePasswordChange = () => {
    // Handle password change logic
    console.log("Password change requested");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Info
            </TabsTrigger>
            <TabsTrigger value="brand-assets" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Brand Assets
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing-history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Billing History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName"
                    value={userProfile.firstName}
                    onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    value={userProfile.lastName}
                    onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Read-only)</Label>
                  <Input 
                    id="email"
                    value={userProfile.email}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number (Read-only)</Label>
                  <Input 
                    id="mobile"
                    value={userProfile.mobile}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Business Information</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName"
                    value={userProfile.businessName}
                    onChange={(e) => setUserProfile({...userProfile, businessName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="goals">Business Goals</Label>
                  <Textarea 
                    id="goals"
                    value={userProfile.goals}
                    onChange={(e) => setUserProfile({...userProfile, goals: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="websiteLink">Website Link</Label>
                  <Input 
                    id="websiteLink"
                    value={userProfile.websiteLink}
                    onChange={(e) => setUserProfile({...userProfile, websiteLink: e.target.value})}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Target Audience</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="targetAudience">Target Audience Description</Label>
                  <Textarea 
                    id="targetAudience"
                    value={userProfile.targetAudience}
                    onChange={(e) => setUserProfile({...userProfile, targetAudience: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="audienceInterests">Audience Interests</Label>
                  <Textarea 
                    id="audienceInterests"
                    value={userProfile.audienceInterests}
                    onChange={(e) => setUserProfile({...userProfile, audienceInterests: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Age Range</Label>
                  <Select value={userProfile.audienceAge} onValueChange={(value) => setUserProfile({...userProfile, audienceAge: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-54">45-54</SelectItem>
                      <SelectItem value="55+">55+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="audienceLocation">Primary Location</Label>
                  <Input 
                    id="audienceLocation"
                    value={userProfile.audienceLocation}
                    onChange={(e) => setUserProfile({...userProfile, audienceLocation: e.target.value})}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Change Password</h3>
              <div className="space-y-6 max-w-md">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={handlePasswordChange} className="btn-hero">
                  Update Password
                </Button>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleProfileUpdate} className="btn-hero">
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="brand-assets" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Brand Assets</h3>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Asset
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label>Brand Colors</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color"
                          value={userProfile.primaryColor}
                          onChange={(e) => setUserProfile({...userProfile, primaryColor: e.target.value})}
                          className="w-12 h-10 border border-border rounded"
                        />
                        <Input value={userProfile.primaryColor} readOnly className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color"
                          value={userProfile.secondaryColor}
                          onChange={(e) => setUserProfile({...userProfile, secondaryColor: e.target.value})}
                          className="w-12 h-10 border border-border rounded"
                        />
                        <Input value={userProfile.secondaryColor} readOnly className="flex-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Font Style</Label>
                    <Select value={userProfile.fontStyle} onValueChange={(value) => setUserProfile({...userProfile, fontStyle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern & Clean</SelectItem>
                        <SelectItem value="classic">Classic & Elegant</SelectItem>
                        <SelectItem value="playful">Playful & Fun</SelectItem>
                        <SelectItem value="bold">Bold & Strong</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Brand Style</Label>
                    <Select value={userProfile.brandStyle} onValueChange={(value) => setUserProfile({...userProfile, brandStyle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="vibrant">Vibrant</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-4 block">Uploaded Assets</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Logo.png', 'Brand Colors.pdf', 'Style Guide.pdf', 'Product Images.zip'].map(asset => (
                      <div key={asset} className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer">
                        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">{asset}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Current Subscription</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Plan</span>
                      <span>{subscription.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status</span>
                      <Badge className="bg-success/10 text-success border-success/20">{subscription.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Monthly Amount</span>
                      <span className="font-semibold">{subscription.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Next Billing</span>
                      <span>{subscription.nextBilling}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Posts Used This Month</span>
                        <span>{subscription.postsUsed}/{subscription.postsLimit}</span>
                      </div>
                      <Progress value={(subscription.postsUsed / subscription.postsLimit) * 100} className="h-3" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{subscription.postsLimit - subscription.postsUsed} posts remaining</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing-history" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Billing History</h3>
              <div className="space-y-4">
                {billingHistory.map(bill => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{bill.description}</p>
                      <p className="text-sm text-muted-foreground">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{bill.amount}</p>
                      <Badge className="bg-success/10 text-success border-success/20">
                        <Check className="h-3 w-3 mr-1" />
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;