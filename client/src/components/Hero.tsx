import { motion } from "framer-motion";
import { ArrowRight, Terminal, Code2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/dark_futuristic_abstract_hero_background_with_neon_cyber_grid_and_glowing_nodes..png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Open for work
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display mb-6"
          >
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 glow-text">
              Digital Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Full-stack developer specializing in modern web technologies.
            Crafting immersive, high-performance digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-primary hover:bg-primary/90">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-white/10 hover:bg-white/5">
              Read Blog
            </Button>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-muted-foreground/50"
          >
              <div className="flex flex-col items-center gap-2">
                  <Terminal size={32} />
                  <span className="text-sm uppercase tracking-widest">Backend</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <Code2 size={32} />
                  <span className="text-sm uppercase tracking-widest">Frontend</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <Cpu size={32} />
                  <span className="text-sm uppercase tracking-widest">Systems</span>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
