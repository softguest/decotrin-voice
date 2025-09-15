import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import PsychotherapyHighlight from "@/components/PsychotherapyHighlight";
import TherapyProcess from "@/components/TherapyProcess";
import CouplesTherapy from "@/components/CouplesTherapy";
import ConsultationForm from "@/components/ConsultationForm";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {/* <ServicesOverview /> */}
        <PsychotherapyHighlight />
        <TherapyProcess />
        <CouplesTherapy />
        <ConsultationForm />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
