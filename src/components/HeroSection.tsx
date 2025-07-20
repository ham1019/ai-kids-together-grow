import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, Heart, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background with uploaded image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url(/lovable-uploads/628e8006-be0b-44d5-812e-dffd9dc5113f.png)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Hero Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI로 실천하는
              <br />
              <span className="text-yellow-200">우리 아이 교육</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              매일 조금씩, 함께하는 부모들과 
              <br className="hidden sm:block" />
              AI 시대 우리 아이 교육법을 나누고 실천해보세요
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-warm text-lg px-8 py-6"
            >
              <Heart className="mr-2 h-5 w-5" />
              커뮤니티 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              교육 가이드 보기
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-yellow-200" />
                <h3 className="text-2xl font-bold mb-1">1,200+</h3>
                <p className="text-white/80">함께하는 부모들</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-yellow-200" />
                <h3 className="text-2xl font-bold mb-1">500+</h3>
                <p className="text-white/80">AI 교육 아이디어</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3 text-yellow-200" />
                <h3 className="text-2xl font-bold mb-1">98%</h3>
                <p className="text-white/80">만족도</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};