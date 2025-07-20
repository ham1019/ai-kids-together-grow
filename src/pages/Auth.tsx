import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!nickname.trim()) {
          toast({
            title: "닉네임을 입력해주세요",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        result = await signUp(email, password, nickname);
      }

      if (result.error) {
        let errorMessage = "오류가 발생했습니다";
        
        if (result.error.message.includes("already registered")) {
          errorMessage = "이미 가입된 이메일입니다";
        } else if (result.error.message.includes("Invalid login credentials")) {
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다";
        } else if (result.error.message.includes("Password should be")) {
          errorMessage = "비밀번호는 최소 6자 이상이어야 합니다";
        }

        toast({
          title: errorMessage,
          variant: "destructive"
        });
      } else if (!isLogin) {
        toast({
          title: "회원가입 완료!",
          description: "로그인해주세요"
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        title: "네트워크 오류가 발생했습니다",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
            AI 아이교육
          </CardTitle>
          <CardDescription>
            {isLogin ? '로그인하여 커뮤니티에 참여하세요' : '새로운 계정을 만들어보세요'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">이메일</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="최소 6자 이상"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">닉네임</label>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="커뮤니티에서 사용할 이름"
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-hero hover:opacity-90"
              disabled={loading}
            >
              {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}