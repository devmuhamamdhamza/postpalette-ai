import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic - route based on email
    if (email.includes("admin@")) {
      navigate("/admin");
    } else if (email.includes("superadmin@")) {
      navigate("/super-admin");
    } else {
      navigate("/dashboard");
    }
  };

  const demoAccounts = [
    { type: "User", email: "user@demo.com", role: "Regular User Dashboard" },
    { type: "Admin", email: "admin@demo.com", role: "Content Admin Dashboard" },
    { type: "Super Admin", email: "superadmin@demo.com", role: "System Administrator" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient-primary">ContentAI Pro</h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Demo Account Cards */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3 text-center text-muted-foreground">
            Demo Accounts - Click to login:
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <Card key={account.type} className="p-3 hover-lift cursor-pointer transition-all duration-200" 
                    onClick={() => {
                      setEmail(account.email);
                      setPassword("demo123");
                    }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{account.type}</p>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    <p>{account.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button variant="link" className="px-0">
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="btn-hero w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="px-0" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            </p>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate("/")} className="text-muted-foreground">
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;