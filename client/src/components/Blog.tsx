import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat, Share2 } from "lucide-react";

const tweets = [
  {
    id: 1,
    content: "Just shipped a new feature using WebGL and React Three Fiber. The performance gains are incredible when you optimize your meshes correctly. 🚀 #webdev #3d",
    date: "2h ago",
    likes: 124,
    retweets: 18,
  },
  {
    id: 2,
    content: "Unpopular opinion: TypeScript configs are actually fun once you understand what every flag does. It's like configuring your own spaceship cockpit.",
    date: "5h ago",
    likes: 892,
    retweets: 145,
  },
  {
    id: 3,
    content: "Designing for the future means letting go of the constraints of the past. Glassmorphism isn't just a trend, it's a way to add depth to flat interfaces.",
    date: "1d ago",
    likes: 456,
    retweets: 56,
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-black/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display">Latest Thoughts</h2>
          <div className="text-primary font-mono text-sm">@dev_future</div>
        </div>

        <div className="space-y-6">
          {tweets.map((tweet, index) => (
            <motion.div
              key={tweet.id}
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
                      <span className="text-muted-foreground text-sm">· {tweet.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-[4.5rem] pt-0">
                  <p className="text-lg mb-4 leading-relaxed">{tweet.content}</p>
                  <div className="flex items-center justify-between text-muted-foreground max-w-md">
                    <button className="hover:text-primary transition-colors flex items-center gap-1 text-sm">
                      <MessageCircle className="h-4 w-4" /> 12
                    </button>
                    <button className="hover:text-green-500 transition-colors flex items-center gap-1 text-sm">
                      <Repeat className="h-4 w-4" /> {tweet.retweets}
                    </button>
                    <button className="hover:text-pink-500 transition-colors flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4" /> {tweet.likes}
                    </button>
                    <button className="hover:text-blue-500 transition-colors flex items-center gap-1 text-sm">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
