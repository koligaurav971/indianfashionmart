import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Inbox, PackageSearch } from "lucide-react";

interface EmptyStateProps {
  variant?: "empty" | "error" | "search";
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const icons = {
  empty: Inbox,
  error: AlertTriangle,
  search: PackageSearch,
};

const defaults = {
  empty: {
    title: "Nothing here yet",
    description: "Be the first to post a listing!",
  },
  error: {
    title: "Something went wrong",
    description: "We couldn't load the data. Please try again.",
  },
  search: {
    title: "No results found",
    description: "Try adjusting your filters or search terms.",
  },
};

export function EmptyState({
  variant = "empty",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icons[variant];
  const text = defaults[variant];

  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="max-w-xs">
        <h3 className="text-lg font-semibold text-foreground">
          {title ?? text.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {description ?? text.description}
        </p>
      </div>
      {action && (
        <Button onClick={action.onClick} data-ocid="empty_state.action_button">
          {action.label}
        </Button>
      )}
    </div>
  );
}
