import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";
import Link from "next/link";

const ConsultationForm = () => {
  return (
    <section 
      id="get-started" 
      className="py-20 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bg00.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#005f59]/90"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your AI-Powered Therapy Journey
          </h2>
          <p className="text-lg text-white mb-8">
            With Decotrin, you can connect to an AI voice agent anytime, have 
            real conversations, and receive a personalized session report — 
            all from the comfort of your space.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div>
            {/* Free AI session CTA */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="text-xl font-semibold text-white mb-4">
                Try a Free Voice Session
              </h3>
              <p className="text-muted-foreground mb-4">
                Experience the future of therapy with a 10-minute free session 
                with one of our AI voice agents.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Headphones className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Available 24/7</span>
              </div>
              <Link href="/dashboard">
                <Button variant="therapeutic" size="lg" className="w-full">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Card with redirect CTA */}
          <Card className="shadow-card bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
            <CardHeader>
              {/* <CardTitle className="text-2xl">Join Decotrin Today</CardTitle> */}
            </CardHeader>
            <CardContent className="space-y-6 py-4">
              <p className="text-muted-foreground">
                Sign up in less than a minute and unlock unlimited access to AI-powered 
                therapy sessions, personalized reports, and 24/7 emotional support.
              </p>
              <Link href="/dashboard" className="w-full">
                <Button size="lg" className="w-full">
                  Sign Up & Start Session
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground py-2">
                Already have an account?{" "}
                <Link href="/dashboard" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
