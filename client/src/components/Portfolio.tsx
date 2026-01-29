import { motion } from "framer-motion";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import SectionHeader from "@/components/SectionHeader";

type ApiProject = Omit<Project, "createdAt"> & { createdAt: string };

export default function Portfolio() {
  const {
    data: projectsResponse,
    isLoading,
    error,
  } = useQuery<{ data: ApiProject[] }>({
    queryKey: ["/api/projects"],
  });

  const projects = projectsResponse?.data ?? [];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Projects"
            title="Selected Works"
            subtitle="A collection of projects exploring the intersection of design and technology."
          />
        </div>

        {error ? (
          <Alert variant="destructive" className="max-w-2xl">
            <AlertTitle>Failed to load projects</AlertTitle>
            <AlertDescription>
              We could not reach the projects API. Try again in a moment.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`project-skeleton-${index}`}
                className="bg-card/50 backdrop-blur border-white/10 overflow-hidden h-full flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton key={`tag-skeleton-${tagIndex}`} className="h-6 w-16" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 pt-0">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Empty className="border-white/10 bg-card/40">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderKanban className="h-5 w-5" />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Add your first project to showcase your work here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              When you publish projects via the admin, they will appear on this page.
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-background" />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {(project.tags ?? []).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/10"
                      disabled={!project.repoUrl}
                      asChild={Boolean(project.repoUrl)}
                    >
                      {project.repoUrl ? (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Code
                        </a>
                      ) : (
                        <span>
                          <Github className="mr-2 h-4 w-4" /> Code
                        </span>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={!project.liveUrl}
                      asChild={Boolean(project.liveUrl)}
                    >
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Demo
                        </a>
                      ) : (
                        <span>
                          <ExternalLink className="mr-2 h-4 w-4" /> Demo
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
