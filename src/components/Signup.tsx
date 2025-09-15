import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Zap, Eye, EyeOff, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$500",
      posts: "20 posts",
      features: [
        "AI-powered content creation",
        "Admin review & editing", 
        "User approval workflow",
        "Hootsuite integration",
        "Brand asset management",
        "3 revisions per post"
      ]
    },
    {
      id: "professional", 
      name: "Professional",
      price: "$1,000",
      posts: "40 posts",
      features: [
        "Everything in Starter",
        "Priority admin review",
        "Advanced analytics",
        "Custom brand guidelines", 
        "Dedicated account manager",
        "Unlimited revisions"
      ],
      popular: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - redirect to user dashboard
    navigate("/dashboard");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient-primary">ContentAI Pro</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Start Your Free Trial</h2>
          <p className="text-muted-foreground">Choose your plan and get started in minutes</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Plan Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`p-6 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-primary shadow-brand' 
                        : 'hover:shadow-md'
                    } ${plan.popular ? 'relative' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-6">
                        <Badge className="bg-gradient-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id 
                            ? 'bg-primary border-primary' 
                            : 'border-muted-foreground'
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{plan.name}</h4>
                          <p className="text-muted-foreground text-sm">{plan.posts}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gradient-primary">{plan.price}</p>
                        <p className="text-sm text-muted-foreground">/month</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trial Benefits */}
            <Card className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                14-Day Free Trial Includes:
              </h4>
              <div className="space-y-2">
                {[
                  "Full access to all features",
                  "5 free AI-generated posts", 
                  "Complete admin workflow",
                  "Hootsuite integration setup",
                  "Priority onboarding support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Signup Form */}
          <div>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Create Your Account</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName"
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Business Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@yourcompany.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="px-0 h-auto">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="px-0 h-auto">
                      Privacy Policy
                    </Button>
                  </label>
                </div>

                <Button type="submit" className="btn-hero w-full text-lg py-6">
                  Start Free Trial
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="px-0" onClick={() => navigate("/login")}>
                    Sign in
                  </Button>
                </p>
              </div>
            </Card>

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Your data is encrypted and secure. Cancel anytime during your trial.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="link" onClick={() => navigate("/")} className="text-muted-foreground">
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;