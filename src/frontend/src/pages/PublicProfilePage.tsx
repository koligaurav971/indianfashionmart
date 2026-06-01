import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useBackend } from "@/hooks/useBackend";
import type { Principal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Grid3X3, MapPin, Package } from "lucide-react";

export function PublicProfilePage() {
  const { id } = useParams({ from: "/profile/$id" });
  const { actor, isReady } = useBackend();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: async () => {
      if (!actor) return null;
      const principal = { toString: () => id } as Principal;
      return actor.getUserProfile(principal);
    },
    enabled: isReady && !!id,
  });

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ["seller-listings", id],
    queryFn: async () => {
      if (!actor) return null;
      const principal = { toString: () => id } as Principal;
      return actor.getListingsBySeller(principal, BigInt(0), BigInt(12));
    },
    enabled: isReady && !!id,
  });

  const initials = (profile?.name ?? "U").slice(0, 2).toUpperCase();
  const memberDate = profile
    ? new Date(
        Number(profile.memberSince / BigInt(1_000_000)),
      ).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "";
  const listingCount = listings?.items?.length ?? 0;
  const activeCount =
    listings?.items?.filter((l) => l.status === "active").length ?? 0;

  return (
    <div
      className="mx-auto max-w-screen-md px-4 py-8"
      data-ocid="public-profile.page"
    >
      <button
        type="button"
        onClick={() => navigate({ to: "/listings" })}
        className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="public-profile.back_button"
      >
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </button>

      {profileLoading ? (
        <LoadingSkeleton
          variant="avatar"
          count={3}
          className="flex flex-col gap-4"
        />
      ) : !profile ? (
        <EmptyState variant="error" title="User not found" />
      ) : (
        <>
          {/* Profile card */}
          <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />
            <div className="p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {/* Avatar */}
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-md flex-shrink-0">
                  {profile.avatarUrl ? (
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  ) : null}
                  <AvatarFallback className="text-2xl font-bold bg-primary/15 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {profile.name}
                  </h1>

                  {profile.bio && (
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-prose">
                      {profile.bio}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {profile.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {profile.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                      Member since {memberDate}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        <span className="font-semibold text-foreground">
                          {listingCount}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          listings
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-2">
                      <Grid3X3 className="h-4 w-4 text-accent" />
                      <span className="text-sm">
                        <span className="font-semibold text-foreground">
                          {activeCount}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          active
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Listings grid */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-foreground">
                Listings by {profile.name}
              </h2>
              {listingCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {listingCount} item{listingCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            {listingsLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <LoadingSkeleton variant="card" count={6} />
              </div>
            ) : !listings?.items?.length ? (
              <EmptyState
                title="No active listings"
                description="This seller hasn't posted any items yet."
              />
            ) : (
              <div
                className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                data-ocid="public-profile.listings_grid"
              >
                {listings.items.map((listing, i) => (
                  <ListingCard
                    key={String(listing.id)}
                    listing={listing}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
