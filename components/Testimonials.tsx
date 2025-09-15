import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      testimonial: "The therapy sessions have been transformative for me. I've learned to manage my anxiety and have developed healthy coping strategies that I use daily. The therapist created such a safe and supportive environment."
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      testimonial: "Couples therapy saved our relationship. We learned how to communicate effectively and work through our differences. We're stronger than ever now and have tools to handle future challenges together."
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from people who have found healing and growth through our therapy services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card bg-card border-border/50">
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
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
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