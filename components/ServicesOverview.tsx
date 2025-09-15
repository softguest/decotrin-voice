import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Shield, Lightbulb, Zap, Sun } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      icon: Brain,
      title: "Stress & Anxiety",
      description: "Evidence-based techniques to manage stress, reduce anxiety, and develop healthy coping strategies."
    },
    {
      icon: Users,
      title: "Couples Counselling",
      description: "Strengthen your relationship through improved communication and conflict resolution skills."
    },
    {
      icon: Shield,
      title: "Trauma Recovery",
      description: "Specialized therapy for processing traumatic experiences and building resilience."
    },
    {
      icon: Lightbulb,
      title: "Building Self-Confidence",
      description: "Develop a positive self-image and build the confidence to achieve your goals."
    },
    {
      icon: Zap,
      title: "Life Transitions",
      description: "Navigate major life changes with support and guidance through uncertain times."
    },
    {
      icon: Sun,
      title: "Depression Support",
      description: "Compassionate care to help overcome depression and rediscover joy in life."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Comprehensive Therapy Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Our evidence-based approach combines various therapeutic modalities to provide 
            personalized care that meets your unique needs and supports your healing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-card border-border/50">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-therapeutic/10 mb-6 group-hover:bg-therapeutic/20 transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-therapeutic" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;