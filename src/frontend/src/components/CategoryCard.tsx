import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  count?: number;
  className?: string;
}

export function CategoryCard({
  label,
  value,
  icon: Icon,
  color,
  count,
  className,
}: CategoryCardProps) {
  return (
    <Link
      to="/search"
      search={{
        category: value,
        keyword: undefined,
        condition: undefined,
        location: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: undefined,
      }}
      data-ocid={`category.${value}.card`}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110",
          color,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-center text-xs font-medium text-foreground leading-tight">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          {count.toLocaleString()} items
        </span>
      )}
    </Link>
  );
}
