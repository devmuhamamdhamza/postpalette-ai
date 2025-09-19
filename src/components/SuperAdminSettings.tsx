import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Shield, 
  CreditCard, 
  Database,
  Eye,
  EyeOff,
  Key,
  Mail,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuperAdminSettings = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    dataRetention: "365",
    backupFrequency: "daily",
    apiRateLimit: "1000",
    maxFileSize: "20"
  });

  const [authSettings, setAuthSettings] = useState({
    passwordMinLength: "8",
    requireSpecialChars: true,
    sessionTimeout: "60",
    twoFactorAuth: false,
    loginAttempts: "5"
  });

  const handlePasswordChange = () => {
    console.log("Password change requested");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSystemSettingsUpdate = () => {
    console.log("System settings updated:", systemSettings);
  };

  const handleAuthSettingsUpdate = () => {
    console.log("Auth settings updated:", authSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">Super Admin Settings</h1>
            <p className="text-muted-foreground">System configuration and account management</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/super-admin")}>
            Back to Dashboard
          </Button>
        </div>

        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="authentication" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing Config
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Account Configuration</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="systemName">System Name</Label>
                    <Input 
                      id="systemName"
                      defaultValue="Content AI Platform"
                    />
                  </div>
                  <div>
                    <Label htmlFor="systemEmail">System Email</Label>
                    <Input 
                      id="systemEmail"
                      type="email"
                      defaultValue="admin@contentai.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="systemDescription">System Description</Label>
                  <Textarea 
                    id="systemDescription"
                    defaultValue="AI-powered content creation and management platform for social media marketing."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <Switch 
                      id="maintenance"
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, maintenanceMode: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="registration">User Registration</Label>
                    <Switch 
                      id="registration"
                      checked={systemSettings.userRegistration}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, userRegistration: checked})
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSystemSettingsUpdate} className="btn-hero">
                  Save Account Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Authentication Settings</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Password Minimum Length</Label>
                    <Select value={authSettings.passwordMinLength} 
                            onValueChange={(value) => setAuthSettings({...authSettings, passwordMinLength: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Select value={authSettings.sessionTimeout} 
                            onValueChange={(value) => setAuthSettings({...authSettings, sessionTimeout: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="specialChars">Require Special Characters</Label>
                    <Switch 
                      id="specialChars"
                      checked={authSettings.requireSpecialChars}
                      onCheckedChange={(checked) => 
                        setAuthSettings({...authSettings, requireSpecialChars: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <Switch 
                      id="twoFactor"
                      checked={authSettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setAuthSettings({...authSettings, twoFactorAuth: checked})
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Maximum Login Attempts</Label>
                  <Select value={authSettings.loginAttempts} 
                          onValueChange={(value) => setAuthSettings({...authSettings, loginAttempts: value})}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAuthSettingsUpdate} className="btn-hero">
                  Save Authentication Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Billing Configuration</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="stripeKey">Stripe API Key</Label>
                    <Input 
                      id="stripeKey"
                      type="password"
                      placeholder="sk_live_..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input 
                      id="taxRate"
                      type="number"
                      defaultValue="0"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingCycle">Default Billing Cycle</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoInvoice">Automatic Invoice Generation</Label>
                  <Switch id="autoInvoice" defaultChecked />
                </div>

                <Button className="btn-hero">
                  Save Billing Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">System Configuration</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Data Retention (days)</Label>
                    <Select value={systemSettings.dataRetention} 
                            onValueChange={(value) => setSystemSettings({...systemSettings, dataRetention: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Backup Frequency</Label>
                    <Select value={systemSettings.backupFrequency} 
                            onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="apiRate">API Rate Limit (requests/hour)</Label>
                    <Input 
                      id="apiRate"
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) => setSystemSettings({...systemSettings, apiRateLimit: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fileSize">Max File Size (MB)</Label>
                    <Input 
                      id="fileSize"
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) => setSystemSettings({...systemSettings, maxFileSize: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch 
                    id="emailNotifications"
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, emailNotifications: checked})
                    }
                  />
                </div>

                <Button onClick={handleSystemSettingsUpdate} className="btn-hero">
                  Save System Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="password" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminSettings;