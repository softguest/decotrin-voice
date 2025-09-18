import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const CouplesTherapy = () => {
  const benefits = [
    "Practice healthier communication with guided AI voice sessions",
    "Learn conflict resolution strategies together in real-time",
    "Receive session reports highlighting key insights as a couple",
    "Strengthen trust and emotional connection through shared reflection",
    "Build a foundation of positive relationship habits with ongoing support"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Strengthen Your Relationship with AI-Guided Sessions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Decotrin offers couples a supportive way to grow together. 
              Engage in real-time AI voice sessions designed to improve communication, 
              resolve conflicts, and help you build lasting relationship patterns — 
              all with personalized reports after each session.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-therapeutic/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-therapeutic" />
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="therapeutic">
                Start a Couples Session
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </div>
          </div>

          {/* Image */}
          <div>
            <div className="relative">
              <img
                src="/grid02.png"
                alt="AI couples therapy session"
                className="rounded-2xl shadow-therapeutic w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-therapeutic/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouplesTherapy;
