import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import bg00 from "/bg00.jpg";

const ConsultationForm = () => {
  return (
    <section 
      id="contact" 
      className="py-20 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bg00.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#005f59]/90"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-lg text-white mb-8">
              Take the first step towards positive change. We're here to support you 
              every step of the way with compassionate, professional care.
            </p>

            {/* Free consultation CTA */}
            <div className="bg-card rounded-xl p-6 shadow-card mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Book a Free 20-Minute Consultation
              </h3>
              <p className="text-muted-foreground mb-4">
                Not sure where to start? Let's talk about your needs and how we can help.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">(555) 123-4567</span>
              </div>
              <Button variant="therapeutic" size="lg" className="w-full">
                Schedule Free Consultation
              </Button>
            </div>
          </div>

          {/* Right side - Contact form */}
          <Card className="shadow-card bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button size="lg" className="w-full">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;