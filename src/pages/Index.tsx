import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingSection } from "@/components/OnboardingSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/samplePosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool, TrendingUp, Clock, Flame } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const filteredPosts = samplePosts.filter(post => 
    selectedCategory === "all" || 
    post.category === selectedCategory ||
    (selectedCategory === "age-3-5" && ["3세", "4세", "5세"].some(age => post.tags.includes(age))) ||
    (selectedCategory === "age-6-8" && ["6세", "7세", "8세"].some(age => post.tags.includes(age))) ||
    (selectedCategory === "age-9-12" && ["9세", "10세", "11세", "12세"].some(age => post.tags.includes(age)))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "comments":
        return b.comments - a.comments;
      case "views":
        return b.views - a.views;
      default:
        return 0; // latest (already sorted)
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Onboarding Section */}
      <OnboardingSection />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Write Post CTA */}
            <Card className="bg-gradient-hero text-white shadow-warm">
              <CardContent className="p-6 text-center">
                <PenTool className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">나만의 교육 경험 공유하기</h3>
                <p className="text-sm text-white/80 mb-4">
                  다른 부모들에게 도움이 되는 이야기를 들려주세요
                </p>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                  글쓰기
                </Button>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Popular Tags */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  인기 태그
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {["ChatGPT", "창의성", "영어회화", "감정일기", "과학실험", "수학놀이"].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <div className="lg:col-span-9">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                커뮤니티 피드
                <Badge className="ml-3 bg-primary/10 text-primary border-primary/20">
                  {filteredPosts.length}개 글
                </Badge>
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "latest" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("latest")}
                  className="gap-1"
                >
                  <Clock className="h-4 w-4" />
                  최신순
                </Button>
                <Button
                  variant={sortBy === "popular" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("popular")}
                  className="gap-1"
                >
                  <Flame className="h-4 w-4" />
                  인기순
                </Button>
                <Button
                  variant={sortBy === "comments" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("comments")}
                  className="gap-1"
                >
                  <TrendingUp className="h-4 w-4" />
                  댓글순
                </Button>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                더 많은 글 보기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
