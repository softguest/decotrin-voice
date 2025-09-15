import { Search, Target, Map, CheckCircle } from "lucide-react";

const TherapyProcess = () => {
  const steps = [
    {
      icon: Search,
      title: "Orientation",
      description: "We begin by understanding your background, current challenges, and therapeutic goals."
    },
    {
      icon: Target,
      title: "Identification",
      description: "Together, we identify patterns, triggers, and areas that need focused attention."
    },
    {
      icon: Map,
      title: "Exploration",
      description: "We explore underlying causes and develop personalized strategies for healing."
    },
    {
      icon: CheckCircle,
      title: "Resolution",
      description: "You integrate new insights and skills, moving toward lasting positive change."
    }
  ];

  return (
    <section className="relative py-20 bg-[#005f59]/10 backdrop-blur-sm pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Therapy Process
          </h2>
          <p className="text-lg text-muted-foreground">
            A structured, compassionate approach that guides you through each stage 
            of your healing journey with clear milestones and continuous support.
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

                {/* Connector Line (not on last item) */}
                {/* {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-border transform -translate-y-1/2 translate-x-4"></div>
                )} */}
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