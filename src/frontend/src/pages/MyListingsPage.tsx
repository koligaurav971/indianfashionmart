import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import type { ListingPublic } from "@/types";
import { ListingStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Edit2,
  Eye,
  MapPin,
  MessageSquare,
  Package,
  PlusCircle,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function MyListingRow({
  listing,
  index,
  onDelete,
}: { listing: ListingPublic; index: number; onDelete: () => void }) {
  const imageUrl =
    listing.images[0]?.getDirectURL() ?? "/assets/images/placeholder.svg";
  const price = `₹ ${Number(listing.price).toLocaleString("en-IN")}`;
  const postedDate = new Date(
    Number(listing.createdAt / BigInt(1_000_000)),
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isActive = listing.status === ListingStatus.active;

  return (
    <div
      className="flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors"
      data-ocid={`my-listings.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <Link
        to="/listings/$id"
        params={{ id: String(listing.id) }}
        className="flex-shrink-0 group"
      >
        <img
          src={imageUrl}
          alt={listing.title}
          className="h-24 w-24 rounded-lg object-cover ring-1 ring-border group-hover:ring-primary/40 transition-all duration-200"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/listings/$id"
            params={{ id: String(listing.id) }}
            className="font-semibold text-foreground hover:text-primary transition-colors truncate"
          >
            {listing.title}
          </Link>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={`flex-shrink-0 text-xs ${
              isActive
                ? "bg-accent/15 text-accent border-accent/30 hover:bg-accent/15"
                : "bg-muted text-muted-foreground"
            }`}
            data-ocid={`my-listings.status_badge.${index + 1}`}
          >
            {isActive ? "Active" : "Expired"}
          </Badge>
        </div>

        <p className="text-primary font-bold text-base">{price}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {String(listing.viewCount)} views
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />0 messages
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {postedDate}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 flex-shrink-0 justify-start pt-0.5">
        <Link to="/sell" search={{ edit: String(listing.id) }}>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            data-ocid={`my-listings.edit_button.${index + 1}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
          onClick={onDelete}
          data-ocid={`my-listings.delete_button.${index + 1}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export function MyListingsPage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<ListingPublic | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-listings-page"],
    queryFn: async () =>
      principal && actor
        ? actor.getListingsBySeller(principal, BigInt(0), BigInt(50))
        : null,
    enabled: isReady && isAuthenticated && !!principal,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => actor?.deleteListing(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-listings-page"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
      setDeleteTarget(null);
      toast.success("Listing deleted.");
    },
    onError: () => toast.error("Failed to delete listing."),
  });

  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto max-w-screen-sm px-4 py-16 text-center"
        data-ocid="my-listings.auth_required"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          My Listings
        </h2>
        <p className="text-muted-foreground mb-6">
          Login to manage your listings.
        </p>
        <Button onClick={login} data-ocid="my-listings.login_button">
          Login with Internet Identity
        </Button>
      </div>
    );
  }

  const items = data?.items ?? [];
  const activeCount = items.filter(
    (l) => l.status === ListingStatus.active,
  ).length;
  const expiredCount = items.length - activeCount;

  return (
    <>
      <div
        className="mx-auto max-w-screen-md px-4 py-8"
        data-ocid="my-listings.page"
      >
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              My Listings
            </h1>
            {items.length > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {activeCount} active · {expiredCount} expired
              </p>
            )}
          </div>
          <Link to="/sell">
            <Button data-ocid="my-listings.add_button" className="gap-1.5">
              <PlusCircle className="h-4 w-4" />
              Post New Item
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        {items.length > 0 && (
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: "Total", value: items.length, icon: Package },
              { label: "Active", value: activeCount, icon: Eye },
              {
                label: "Views",
                value: items.reduce((s, l) => s + Number(l.viewCount), 0),
                icon: User,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card p-3 text-center"
              >
                <Icon className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="font-bold text-foreground text-lg leading-none">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* List */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <LoadingSkeleton
              variant="list"
              count={4}
              className="flex flex-col gap-4"
            />
          </div>
        ) : !items.length ? (
          <EmptyState
            title="No listings yet. Start selling!"
            description="Post your sarees, kurtis, or ethnic wear and reach thousands of buyers."
            action={{
              label: "Post Your First Item",
              onClick: () => navigate({ to: "/sell" }),
            }}
            data-ocid="my-listings.empty_state"
          />
        ) : (
          <div className="flex flex-col gap-4" data-ocid="my-listings.list">
            {items.map((listing, i) => (
              <MyListingRow
                key={String(listing.id)}
                listing={listing}
                index={i}
                onDelete={() => setDeleteTarget(listing)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent data-ocid="my-listings.dialog">
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                &ldquo;{deleteTarget?.title}&rdquo;
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="my-listings.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
              disabled={deleteMutation.isPending}
              data-ocid="my-listings.confirm_button"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              {deleteMutation.isPending ? "Deleting..." : "Delete Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
