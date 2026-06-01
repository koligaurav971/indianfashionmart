import type { ListingPublic } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ListingCondition } from "@/types";
import { Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";

interface ListingCardProps {
  listing: ListingPublic;
  index?: number;
  className?: string;
}

const conditionLabels: Record<string, string> = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor",
};

const conditionVariants: Record<string, string> = {
  [ListingCondition.brandNew]:
    "bg-accent/20 text-accent-foreground border-accent/30",
  [ListingCondition.likeNew]:
    "bg-accent/15 text-accent-foreground border-accent/20",
  [ListingCondition.good]: "bg-primary/15 text-primary border-primary/20",
  [ListingCondition.fair]: "bg-muted text-muted-foreground border-border",
  [ListingCondition.poor]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

function formatPrice(price: bigint): string {
  return `₹ ${Number(price).toLocaleString("en-IN")}`;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  const date = new Date(ms);
  const now = Date.now();
  const diff = now - date.getTime();
  if (diff < 86400000) return "Today";
  if (diff < 172800000) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function ListingCard({
  listing,
  index = 0,
  className,
}: ListingCardProps) {
  const imageUrl =
    listing.images[0]?.getDirectURL() ?? "/assets/images/placeholder.svg";
  const conditionLabel =
    conditionLabels[listing.condition] ?? listing.condition;
  const conditionClass =
    conditionVariants[listing.condition] ??
    conditionVariants[ListingCondition.fair];

  return (
    <Link
      to="/listings/$id"
      params={{ id: String(listing.id) }}
      data-ocid={`listing.item.${index + 1}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs font-medium",
              conditionClass,
            )}
          >
            {conditionLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
          {listing.title}
        </h3>
        <p className="text-lg font-bold text-primary">
          {formatPrice(listing.price)}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1 min-w-0">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <Clock className="h-3 w-3" />
            {formatDate(listing.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
