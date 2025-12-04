import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-left pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's build something extraordinary together.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Input placeholder="Your Name" className="bg-background/50 border-white/10 focus:border-primary/50" />
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="Your Email" className="bg-background/50 border-white/10 focus:border-primary/50" />
            </div>
            <div className="space-y-2">
              <Textarea placeholder="Message" className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
              <Mail className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>
        
        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>© 2025 DevFolio. Built with React & Tailwind.</p>
        </div>
      </div>
    </section>
  );
}
