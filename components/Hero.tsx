import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Calendar } from "lucide-react";

const Hero = () => {
  const ctaCards = [
    {
      icon: Heart,
      title: "AI Voice Therapy",
      description: "Talk to AI-powered voice agents anytime you need support.",
      href: "#voice-therapy",
      bgColor: "bg-transparent"
    },
    {
      icon: MessageCircle,
      title: "Real-Time Sessions",
      description: "Engage in live, natural conversations for healing and growth.",
      href: "#real-time",
      bgColor: "bg-transparent"
    },
    {
      icon: Calendar,
      title: "Session Reports",
      description: "Receive personalized insights at the end of every session.",
      href: "#reports",
      bgColor: "bg-[#005f59]"
    }
  ];

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg01.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005f59]/30 via-[#005f59]/20 to-[#005f59]/0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h4 className="text-2xl font-bold text-[#52b7bd]">Your AI Therapy Companion</h4>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Real-Time Voice Therapy
            <span className="text-white block">Available Anytime</span>
          </h1>
          <div className="w-64 h-2 bg-[linear-gradient(to_right,#ff9245,#ff9245_50%,transparent_90%)] rounded-full"></div>
          
          <p className="text-xl md:text-2xl text-white mb-6 mt-4 mx-auto">
            Decotrin connects you with AI-powered voice agents for<br/> 
            instant trauma therapy sessions, meaningful conversations,<br/> 
            and personalized session reports — whenever you need them.
          </p>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 mx-auto border border-border rounded-xl bg-background/20 backdrop-blur-sm">
            {ctaCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card key={index} className={`group hover:shadow-therapeutic transition-all duration-300 cursor-pointer border-0 rounded-0 ${card.bgColor}`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-start">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 mb-4 mr-2 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-[#ff9245] font-bold shadow-md" />
                      </div>
                      <h3 className="text-3xl font-semibold text-white mb-2">{card.title}</h3>
                    </div>
                    <p className="text-white mb-4">{card.description}</p>
                    <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary">
                      Get A Session!
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
