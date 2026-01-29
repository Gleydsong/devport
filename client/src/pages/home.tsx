import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Portfolio />
      <Contact />
    </PageLayout>
  );
}
