import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-hero bg-[#005f59]/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Join the Decotrin Community
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get exclusive tips, insights, and resources to maximize your AI-powered 
              therapy sessions. Learn practical strategies for emotional well-being 
              and self-growth — delivered straight to your inbox.
            </p>
            
            {/* Newsletter form */}
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-card">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newsletter-email" className="text-foreground">Email Address</Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12"
                  />
                </div>
                <Button size="lg" className="w-full" variant="therapeutic">
                  <Mail className="w-5 h-5 mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Illustration/Benefits */}
          <div className="text-primary-foreground">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Session Tips</h3>
                  <p className="text-primary-foreground/80">
                    Maximize your voice therapy sessions with practical guidance and actionable tips.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Progress Insights</h3>
                  <p className="text-primary-foreground/80">
                    Learn how to track your emotional growth and make the most of your session reports.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Early Access</h3>
                  <p className="text-primary-foreground/80">
                    Be the first to know about new AI features, services, and special offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
