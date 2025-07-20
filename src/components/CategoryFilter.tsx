import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories = [
  { id: "all", name: "전체", color: "bg-primary text-primary-foreground" },
  { id: "ai-tools", name: "AI 활용법", color: "bg-soft-blue text-foreground" },
  { id: "age-3-5", name: "3-5세", color: "bg-warm-pink text-foreground" },
  { id: "age-6-8", name: "6-8세", color: "bg-gentle-yellow text-foreground" },
  { id: "age-9-12", name: "9-12세", color: "bg-mint-green text-foreground" },
  { id: "emotional", name: "감정육아", color: "bg-warm-pink text-foreground" },
  { id: "english", name: "영어교육", color: "bg-soft-blue text-foreground" },
  { id: "math", name: "수학놀이", color: "bg-gentle-yellow text-foreground" },
  { id: "creativity", name: "창의성", color: "bg-mint-green text-foreground" },
  { id: "certification", name: "실천인증", color: "bg-primary/80 text-primary-foreground" }
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <Card className="p-4 bg-gradient-card shadow-soft">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3">카테고리</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
            className={`cursor-pointer hover:scale-105 transition-transform ${
              selectedCategory === category.id 
                ? "bg-primary text-primary-foreground shadow-warm" 
                : `${category.color} hover:opacity-80`
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </Card>
  );
};