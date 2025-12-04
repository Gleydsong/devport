import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "NeuroLink Dashboard",
    description: "Real-time data visualization for BCI devices using WebSockets and D3.js.",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "CryptoNexus",
    description: "DeFi portfolio tracker with cross-chain integration and automated reporting.",
    tags: ["Next.js", "Solidity", "Ethers.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    title: "Void Chat",
    description: "End-to-end encrypted messaging platform with ephemeral messages.",
    tags: ["Vue", "Firebase", "WebRTC", "PWA"],
    image: "https://images.unsplash.com/photo-1614064641938-3e8212d8d388?w=800&q=80",
  },
];

export default function Portfolio() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Selected Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of projects exploring the intersection of design and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-display text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 pt-0">
                  <Button variant="outline" size="sm" className="w-full border-white/10">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Button>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
