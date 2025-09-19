import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Eye, EyeOff, Check, Star, ChevronRight, ChevronLeft, Upload, Instagram, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: "",
    goals: "",
    websiteLink: "",
    logo: null as File | null,
    
    // Step 2: Branding
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    fontStyle: "modern",
    brandStyle: "professional",
    
    // Step 3: Target Audience
    targetAudience: "",
    audienceAge: "",
    audienceLocation: "",
    audienceInterests: "",
    
    // Step 4: Content Preferences
    contentTypes: [] as string[],
    postingFrequency: "",
    contentTone: "",
    
    // Step 5: Holidays & Events
    holidays: [] as string[],
    customEvents: "",
    
    // Step 6: Social Media Access
    connectedPlatforms: [] as string[],
    
    // Step 7: Account Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const totalSteps = 6;

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
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - redirect to user dashboard
      navigate("/dashboard");
    }
  };

  const handleInputChange = (field: string, value: string | string[] | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    if (currentArray.includes(value)) {
      handleInputChange(field, currentArray.filter(item => item !== value));
    } else {
      handleInputChange(field, [...currentArray, value]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="goals">Business Goals</Label>
              <Textarea 
                id="goals"
                placeholder="Tell us about your business goals and what you want to achieve with social media..."
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="websiteLink">Website Link (Optional)</Label>
              <Input 
                id="websiteLink"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.websiteLink}
                onChange={(e) => handleInputChange("websiteLink", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="logo">Upload Logo (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your logo or</p>
                <Button variant="outline">Choose File</Button>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Brand Colors</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor" className="text-sm">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color"
                      id="primaryColor"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      className="w-12 h-10 border border-border rounded"
                    />
                    <Input value={formData.primaryColor} readOnly className="flex-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor" className="text-sm">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color"
                      id="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      className="w-12 h-10 border border-border rounded"
                    />
                    <Input value={formData.secondaryColor} readOnly className="flex-1" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Font Style</Label>
              <Select value={formData.fontStyle} onValueChange={(value) => handleInputChange("fontStyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font style" />
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
              <Select value={formData.brandStyle} onValueChange={(value) => handleInputChange("brandStyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand style" />
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
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="targetAudience">Target Audience Description</Label>
              <Textarea 
                id="targetAudience"
                placeholder="Describe your ideal customer/audience..."
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="audienceAge">Age Range</Label>
              <Select value={formData.audienceAge} onValueChange={(value) => handleInputChange("audienceAge", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
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
                placeholder="e.g., United States, Europe, Global"
                value={formData.audienceLocation}
                onChange={(e) => handleInputChange("audienceLocation", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="audienceInterests">Interests & Hobbies</Label>
              <Textarea 
                id="audienceInterests"
                placeholder="What interests does your audience have? (e.g., fitness, technology, cooking...)"
                value={formData.audienceInterests}
                onChange={(e) => handleInputChange("audienceInterests", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Content Types (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["Informational", "Educational", "Promotional", "Entertaining", "Behind-the-scenes", "User-generated"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type}
                      checked={formData.contentTypes.includes(type)}
                      onCheckedChange={() => handleArrayToggle("contentTypes", type)}
                    />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Posting Frequency</Label>
              <Select value={formData.postingFrequency} onValueChange={(value) => handleInputChange("postingFrequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How often do you want to post?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="3-week">3 times per week</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Content Tone</Label>
              <Select value={formData.contentTone} onValueChange={(value) => handleInputChange("contentTone", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly & Casual</SelectItem>
                  <SelectItem value="witty">Witty & Humorous</SelectItem>
                  <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
                  <SelectItem value="educational">Educational & Informative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Holidays & Special Events (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["Christmas", "New Year", "Valentine's Day", "Easter", "Mother's Day", "Father's Day", "Halloween", "Thanksgiving", "Black Friday", "Cyber Monday"].map((holiday) => (
                  <div key={holiday} className="flex items-center space-x-2">
                    <Checkbox 
                      id={holiday}
                      checked={formData.holidays.includes(holiday)}
                      onCheckedChange={() => handleArrayToggle("holidays", holiday)}
                    />
                    <Label htmlFor={holiday} className="text-sm">{holiday}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="customEvents">Custom Events & Important Dates</Label>
              <Textarea 
                id="customEvents"
                placeholder="Company anniversary, product launches, industry events, etc..."
                value={formData.customEvents}
                onChange={(e) => handleInputChange("customEvents", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
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

            {/* Plan Selection - Now at the end */}
            <div className="border-t pt-6">
              <Label className="text-lg">Choose Your Plan</Label>
              <div className="grid gap-4 mt-4">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-primary shadow-brand' 
                        : 'hover:shadow-md'
                    } ${plan.popular ? 'relative' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id 
                            ? 'bg-primary border-primary' 
                            : 'border-muted-foreground'
                        }`}>
                          {selectedPlan === plan.id && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{plan.name}</h4>
                          <p className="text-sm text-muted-foreground">{plan.posts}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gradient-primary">{plan.price}</p>
                        <p className="text-xs text-muted-foreground">/month</p>
                      </div>
                    </div>
                  </Card>
                ))}
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
          </div>
        );
        
      default:
        return null;
    }
  };

  const stepTitles = [
    "Business Information",
    "Branding & Style", 
    "Target Audience",
    "Content Preferences",
    "Holidays & Events",
    "Social Media Access",
    "Account & Plan"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient-primary">ContentAI Pro</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Onboard</h2>
          <p className="text-muted-foreground">Let's set up your account and customize your experience</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{stepTitles[currentStep - 1]}</h3>
              <p className="text-sm text-muted-foreground">
                {currentStep === 1 && "Tell us about your business"}
                {currentStep === 2 && "Define your brand's visual identity"}
                {currentStep === 3 && "Help us understand your audience"}
                {currentStep === 4 && "What type of content works best for you?"}
                {currentStep === 5 && "Which events should we create content for?"}
                {currentStep === 6 && "Connect your social media accounts"}
                {currentStep === 7 && "Create your account and choose a plan"}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  type="submit"
                  className="flex items-center gap-2 btn-hero"
                >
                  {currentStep === totalSteps ? (
                    "Start Free Trial"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-2">
              Already have an account?{" "}
              <Button variant="link" className="px-0" onClick={() => navigate("/login")}>
                Sign in
              </Button>
            </p>
            <Button variant="link" onClick={() => navigate("/")} className="text-muted-foreground">
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;