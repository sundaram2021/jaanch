import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksGrid } from "@/components/landing/how-it-works-grid";
import { CtaBanner } from "@/components/landing/cta-banner";
import { FeatureAuditGrid } from "@/components/landing/feature-audit-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#17212b] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-5 sm:px-8">
        <div className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-4 sm:py-6">
          <HeroSection />
        </div>

        <div className="pb-16 pt-6 space-y-10">
          <HowItWorksGrid />
          <CtaBanner />
          <FeatureAuditGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
