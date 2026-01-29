import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Portfolio />
      <Blog />
      <Contact />
    </PageLayout>
  );
}
