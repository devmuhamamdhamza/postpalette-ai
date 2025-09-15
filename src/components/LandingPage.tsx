import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Zap, Users, Calendar, Brain, Shield, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI Content Generation",
      description: "Powered by Jasper AI to create engaging, brand-aligned content automatically"
    },
    {
      icon: Shield,
      title: "Admin Review Process",
      description: "Quality control with admin approval before content goes live"
    },
    {
      icon: Users,
      title: "User Approval System",
      description: "Final client approval ensures perfect brand alignment"
    },
    {
      icon: Calendar,
      title: "Auto-Publishing",
      description: "Seamless integration with Hootsuite for automated scheduling"
    }
  ];

  const pricingPlans = [
    {
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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient-primary">ContentAI Pro</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button className="btn-hero" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient-hero">AI-Powered</span>{" "}
            <br />
            Social Media Content
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your social media strategy with AI-generated content that's reviewed, 
            approved, and published automatically. From concept to post in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero text-lg px-10 py-6" onClick={() => navigate('/signup')}>
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-hero-outline text-lg px-10 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Streamlined Content Workflow</h2>
          <p className="text-xl text-muted-foreground">AI generation → Admin review → Client approval → Auto-publish</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="card-feature animate-fade-in-up hover-lift" 
                 style={{ animationDelay: `${index * 0.1}s` }}>
              <feature.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">Choose the plan that fits your content needs</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={plan.name} className={`p-8 relative hover-lift ${
              plan.popular 
                ? 'ring-2 ring-primary shadow-brand' 
                : 'border border-border'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gradient-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-accent font-medium">{plan.posts}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.popular ? 'btn-hero' : 'btn-hero-outline'}`}
                onClick={() => navigate('/signup')}
              >
                Choose {plan.name}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help you get started.
            </p>
          </div>
          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <Input placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Tell us about your content needs..." rows={4} />
              </div>
              <Button className="btn-hero w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">ContentAI Pro</span>
            </div>
            <p className="text-primary-foreground/80">
              © 2024 ContentAI Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;