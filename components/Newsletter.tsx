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
              Join Our Healing Community
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Stay connected with weekly insights, self-care tips, and therapeutic resources 
              delivered directly to your inbox. Join thousands who are prioritizing their mental health.
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
                  Subscribe to Newsletter
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
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
                  <h3 className="text-xl font-semibold mb-2">Weekly Wellness Tips</h3>
                  <p className="text-primary-foreground/80">
                    Practical strategies for managing stress and building resilience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                  <p className="text-primary-foreground/80">
                    Access to articles, guides, and tools for personal growth.
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
                    Be the first to know about new services and special offers.
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