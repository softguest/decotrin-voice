import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const navigation = {
    services: [
      { name: "AI Therapy Sessions", href: "#" },
      { name: "Session Reports", href: "#" },
      { name: "Couples & Group Therapy", href: "#" },
      { name: "Trauma Recovery", href: "#" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Self-Help Guides", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Privacy & Safety", href: "#" }
    ],
    company: [
      { name: "About Decotrin", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "AI Agents", href: "#" },
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
    <footer className="relative bg-gradient-to-t from-[#005f59] via-[#005f59]/90 to-[#005f59]/80 text-white overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#ff9245]/10 via-[#ff9245]/5 to-transparent"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* Company Info */}
          <div className="space-y-6 p-4 bg-gradient-to-b from-[#ff9245]/5 to-transparent rounded-xl">
            <div className="h-8 w-32 flex items-center justify-center">
              <span className="w-6 h-6 bg-[#ff9245] rounded-full mr-2"></span>
              <span className="text-white font-semibold text-2xl">Decotrin</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              AI-powered voice therapy platform providing 24/7 access to guided sessions, 
              personalized reports, and tools to support your mental well-being and growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {/* <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-white/60" />
                <span>(555) 123-4567</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white/60" />
                <span>support@decotrin.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-white/60" />
                <span>Virtual Platform – Access Anywhere</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="p-4 bg-gradient-to-b from-[#ff9245]/5 to-transparent rounded-xl">
            <h3 className="text-lg font-semibold mb-6 text-[#ff9245]">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-[#ff9245] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="p-4 bg-gradient-to-b from-[#ff9245]/5 to-transparent rounded-xl">
            <h3 className="text-lg font-semibold mb-6 text-[#ff9245]">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-[#ff9245] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="p-4 bg-gradient-to-b from-[#ff9245]/5 to-transparent rounded-xl">
            <h3 className="text-lg font-semibold mb-6 text-[#ff9245]">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-[#ff9245] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 border-white/20 relative z-10" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative z-10">
          <div className="flex items-center space-x-4">
            <p className="text-white/60 text-sm">
              © 2024 Decotrin. All rights reserved.
            </p>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-white/60 hover:text-[#ff9245] text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#ff9245] text-sm transition-colors duration-200">
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
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff9245] transition-colors duration-200"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5 text-white" />
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
