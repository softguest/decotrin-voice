import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      testimonial:
        "Decotrin’s AI voice agent felt so natural to talk to. I could open up without fear of judgment, and the session report gave me clear steps I could actually follow in my daily life."
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      testimonial:
        "I love how I can start a therapy session anytime, even late at night. The real-time voice conversations make me feel supported 24/7, and the reports help me track my progress."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from people using Decotrin to find support, healing, and guidance 
            through AI-powered voice therapy sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="shadow-card bg-card border-border/50 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial */}
                <blockquote className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
