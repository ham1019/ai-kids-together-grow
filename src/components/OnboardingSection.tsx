import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users2, Target, MessageSquare } from "lucide-react";

export const OnboardingSection = () => {
  const steps = [
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "커뮤니티 가입",
      description: "비슷한 고민을 가진 부모들과 만나보세요",
      color: "bg-soft-blue"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "AI 아이디어 발견",
      description: "매일 새로운 AI 교육법을 찾아보세요",
      color: "bg-gentle-yellow"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "실천하고 공유",
      description: "오늘의 교육 활동을 인증하고 공유하세요",
      color: "bg-mint-green"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "소통과 격려",
      description: "다른 부모들과 경험을 나누고 격려받으세요",
      color: "bg-warm-pink"
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            시작 가이드
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            오늘부터 실천하는 AI 교육
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            4단계로 시작하는 우리 아이 AI 교육 여정
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50">
              <CardHeader className="text-center pb-3">
                <div className={`w-12 h-12 ${step.color} rounded-full mx-auto mb-3 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {index + 1}단계
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Mission Preview */}
        <div className="mt-12">
          <Card className="bg-gradient-hero/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">
                💡 오늘의 실천 미션
              </h3>
              <p className="text-foreground mb-4">
                "AI 그림 생성 도구로 아이와 함께 상상의 동물 그려보기"
              </p>
              <Badge className="bg-primary text-primary-foreground">
                🎯 참여자 78명 | ❤️ 좋아요 156개
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};