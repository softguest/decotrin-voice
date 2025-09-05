import { TestHero } from "@/components/TestHero";
import Image from "next/image";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";

export default function Home() {
  return (
    <div>
      <TestHero />
      <FeatureBentoGrid />
    </div>
  );
}
