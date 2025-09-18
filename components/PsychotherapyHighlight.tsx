import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PsychotherapyHighlight = () => {
  const benefits = [
    "Instant access to AI-powered voice therapy agents anytime",
    "Engaging real-time conversations designed for emotional support",
    "Personalized session reports with actionable insights",
    "Confidential and secure platform for your well-being",
    "Flexible sessions — no appointments required"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="/bg00.jpg"
                alt="AI voice therapy session"
                className="rounded-2xl shadow-therapeutic w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              AI-Powered Therapy That’s Always There for You
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Decotrin lets you connect with AI voice agents for therapy 
              anytime you need it. Have meaningful conversations in real-time 
              and receive personalized reports that help you track your growth 
              and well-being over time.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default">
                Start a Voice Session
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychotherapyHighlight;
