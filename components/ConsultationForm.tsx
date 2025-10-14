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
            With Decotrin, you can begin therapy from anywhere — instantly.
            Talk with your AI companion, gain insight, and track your progress over time.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}

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
                <Button size="lg" variant="therapeutic" className="w-full">
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