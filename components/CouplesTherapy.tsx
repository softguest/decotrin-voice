import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
// import couplesTherapy from "@/assets/couples-therapy.jpg";

const CouplesTherapy = () => {
  const benefits = [
    "Improve communication and listening skills",
    "Learn healthy conflict resolution techniques",
    "Rebuild trust and emotional intimacy",
    "Develop shared goals and vision for the future",
    "Create lasting positive relationship patterns"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Strengthen Your Relationship Through Couples Therapy
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're facing challenges or simply want to deepen your connection, 
              our couples therapy provides a safe space to grow together and build a stronger, 
              more fulfilling relationship.
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
                Book Couples Session
              </Button>
              <Button size="lg" variant="outline">
                Download Relationship Guide
              </Button>
            </div>
          </div>

          {/* Image */}
          <div>
            <div className="relative">
              <img
                src="/grid02.png"
                alt="Couples therapy session"
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