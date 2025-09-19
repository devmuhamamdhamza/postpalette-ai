import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar,
  Activity,
  Eye,
  EyeOff
} from "lucide-react";

interface AdminUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'view';
  admin?: {
    id: number;
    name: string;
    email: string;
    role: string;
    tasksCompleted: number;
    status: string;
  } | null;
}

const AdminUserModal = ({ isOpen, onClose, mode, admin }: AdminUserModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    role: admin?.role || "Content Admin",
    password: "",
    confirmPassword: "",
    permissions: ["content_review", "user_management"],
    status: admin?.status || "active"
  });

  const handleSubmit = () => {
    if (mode === 'add') {
      console.log("Adding new admin:", formData);
    } else if (mode === 'edit') {
      console.log("Updating admin:", formData);
    }
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'add':
        return 'Add New Admin User';
      case 'edit':
        return `Edit Admin - ${admin?.name}`;
      case 'view':
        return `Admin Details - ${admin?.name}`;
      default:
        return 'Admin User';
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {mode === 'view' && admin && (
            <Card className="p-4 bg-accent/5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-muted-foreground">{admin.role}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tasks Completed</span>
                    <Badge variant="outline">{admin.tasksCompleted}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="status-approved">{admin.status}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-muted cursor-not-allowed" : ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-muted cursor-not-allowed" : ""}
              />
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Role *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value})}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Senior Admin">Senior Admin</SelectItem>
                  <SelectItem value="Content Admin">Content Admin</SelectItem>
                  <SelectItem value="Junior Admin">Junior Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Password fields (only for add/edit modes) */}
          {!isReadOnly && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password">
                  {mode === 'add' ? 'Password *' : 'New Password (leave blank to keep current)'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Permissions */}
          <div>
            <Label className="mb-3 block">Permissions</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Content Review',
                'User Management', 
                'Analytics Access',
                'Billing Management',
                'System Settings',
                'Admin Management'
              ].map(permission => (
                <div key={permission} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={permission}
                    defaultChecked={['Content Review', 'User Management'].includes(permission)}
                    disabled={isReadOnly}
                    className="rounded border-border"
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Summary (view mode only) */}
          {isReadOnly && admin && (
            <Card className="p-4">
              <h4 className="font-medium mb-3">Activity Summary</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <p className="text-lg font-bold text-accent">{admin.tasksCompleted}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
                <div className="text-center p-3 bg-success/5 rounded-lg">
                  <p className="text-lg font-bold text-success">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-lg font-bold text-primary">32</p>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </Button>
            {!isReadOnly && (
              <Button onClick={handleSubmit} className="btn-hero">
                {mode === 'add' ? 'Add Admin' : 'Save Changes'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUserModal;