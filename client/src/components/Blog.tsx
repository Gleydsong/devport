import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

type ApiPost = Omit<Post, "createdAt" | "publishedAt"> & {
  createdAt: string;
  publishedAt: string | null;
};

function formatPostDate(post: ApiPost) {
  const rawDate = post.publishedAt ?? post.createdAt;
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return "Draft";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function Blog() {
  const {
    data: postsResponse,
    isLoading,
    error,
  } = useQuery<{ data: ApiPost[] }>({
    queryKey: ["/api/posts"],
  });

  const posts = postsResponse?.data ?? [];

  return (
    <section id="blog" className="py-24 bg-black/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display">Latest Thoughts</h2>
          <div className="text-primary font-mono text-sm">@dev_future</div>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Failed to load posts</AlertTitle>
            <AlertDescription>
              We could not reach the blog API. Try again in a moment.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`post-skeleton-${index}`}
                className="bg-card/30 backdrop-blur border-white/10"
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardHeader>
                <CardContent className="pl-[4.5rem] pt-0">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Empty className="border-white/10 bg-card/40">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileText className="h-5 w-5" />
              </EmptyMedia>
              <EmptyTitle>No posts yet</EmptyTitle>
              <EmptyDescription>
                Publish your first post and it will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              Drafts will stay hidden until you set a published date.
            </EmptyContent>
          </Empty>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/30 backdrop-blur border-white/10 hover:bg-card/50 transition-colors">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DF</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">Dev Future</span>
                        <span className="text-muted-foreground text-sm">@dev_future</span>
                        <span className="text-muted-foreground text-sm">· {formatPostDate(post)}</span>
                      </div>
                      <span className="text-lg font-semibold mt-1">{post.title}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-[4.5rem] pt-0">
                    <p className="text-lg mb-2 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Read more
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
