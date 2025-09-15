import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const navigation = {
    services: [
      { name: "Individual Therapy", href: "#" },
      { name: "Couples Counseling", href: "#" },
      { name: "Group Therapy", href: "#" },
      { name: "Trauma Recovery", href: "#" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Self-Help Guides", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Crisis Resources", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Approach", href: "#" },
      { name: "Therapist Team", href: "#" },
      { name: "Contact", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="h-8 w-32 bg-background rounded-md flex items-center justify-center">
              <span className="text-foreground font-semibold text-sm">TherapyLogo</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Professional trauma therapy and counseling services dedicated to helping you 
              find healing, growth, and emotional well-being in a safe, supportive environment.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-background/60" />
                <span className="text-background/80">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-background/60" />
                <span className="text-background/80">info@therapypractice.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-background/60" />
                <span className="text-background/80">123 Healing Way, Wellness City, WC 12345</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-background/60 text-sm">
              © 2024 Therapy Practice. All rights reserved.
            </p>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-background/60 hover:text-background text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-background text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5 text-background/80" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;