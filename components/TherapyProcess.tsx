import { UserPlus, Mic, MessageCircle, FileText } from "lucide-react";

const TherapyProcess = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free Decotrin account in minutes and get started right away."
    },
    {
      icon: Mic,
      title: "Start a Session",
      description: "Connect instantly with an AI-powered voice agent for real-time therapy."
    },
    {
      icon: MessageCircle,
      title: "Have a Conversation",
      description: "Engage in natural voice-based conversations designed to support your emotional well-being."
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description: "Receive a personalized session report with insights and recommendations after every session."
    }
  ];

  return (
    <section className="relative py-20 bg-[#005f59]/10 backdrop-blur-sm pb-64">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How Decotrin Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, seamless, and available anytime you need support. 
            Get therapy in four easy steps — all powered by AI voice agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group group-hover:scale-110">
                {/* Step Number and Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#005f59] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-therapeutic rounded-full flex items-center justify-center text-therapeutic-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Triangle Divider Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0L1200,120L0,120Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default TherapyProcess;
