import { Flame, Swords, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "free-fire": Flame,
  mlbb: Swords,
};

export function CategoryIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? Swords;
  return <Icon className={className} />;
}
