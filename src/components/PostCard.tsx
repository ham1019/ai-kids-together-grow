import { Heart, MessageCircle, Bookmark, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      childAge?: string;
    };
    category: string;
    tags: string[];
    likes: number;
    comments: number;
    views: number;
    createdAt: string;
    isBookmarked?: boolean;
    isLiked?: boolean;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI 활용법": "bg-soft-blue text-foreground",
      "3-5세": "bg-warm-pink text-foreground",
      "6-8세": "bg-gentle-yellow text-foreground", 
      "9-12세": "bg-mint-green text-foreground",
      "감정육아": "bg-warm-pink text-foreground",
      "영어교육": "bg-soft-blue text-foreground",
      "수학놀이": "bg-gentle-yellow text-foreground",
      "창의성": "bg-mint-green text-foreground",
      "실천인증": "bg-primary/80 text-primary-foreground"
    };
    return colors[category] || "bg-secondary text-secondary-foreground";
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-gradient-hero text-white">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{post.author.name}</span>
                {post.author.childAge && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {post.author.childAge}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{post.createdAt}</span>
              </div>
            </div>
          </div>
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-0 hover:bg-primary/10 cursor-pointer transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 gap-1 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 transition-colors`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </Button>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{post.views}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${post.isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'} hover:text-yellow-500 transition-colors`}
          >
            <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};