import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  LogIn,
  MapPin,
  MessageCircle,
  Tag,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const conditionLabels: Record<string, string> = {
  likeNew: "Like New",
  brandNew: "Brand New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

const conditionColors: Record<string, string> = {
  brandNew: "bg-accent/20 text-accent-foreground border-accent/30",
  likeNew: "bg-accent/15 text-accent-foreground border-accent/20",
  good: "bg-primary/15 text-primary border-primary/20",
  fair: "bg-muted text-muted-foreground border-border",
  poor: "bg-destructive/10 text-destructive border-destructive/20",
};

function formatDate(ts: bigint) {
  return new Date(Number(ts / BigInt(1_000_000))).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatMemberSince(ts: bigint) {
  return new Date(Number(ts / BigInt(1_000_000))).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

export function ListingDetailPage() {
  const { id } = useParams({ from: "/listings/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [viewIncremented, setViewIncremented] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      const result = await actor?.getListing(BigInt(id));
      return result ?? null;
    },
    enabled: isReady && !!id,
  });

  const { data: sellerProfile } = useQuery({
    queryKey: ["user-profile", listing?.sellerId?.toString()],
    queryFn: async () => {
      if (!actor || !listing) return null;
      return actor.getUserProfile(listing.sellerId);
    },
    enabled: isReady && !!listing,
  });

  const { data: similarListings } = useQuery({
    queryKey: ["similar", listing?.category, id],
    queryFn: async () => {
      if (!actor || !listing) return null;
      const result = await actor.getSimilarListings(
        listing.category,
        listing.location,
        BigInt(id),
        BigInt(0),
        BigInt(6),
      );
      return result?.items ?? [];
    },
    enabled: isReady && !!listing,
  });

  const incrementView = useMutation({
    mutationFn: async () => actor?.incrementListingViewCount(BigInt(id)),
    onSuccess: () => setViewIncremented(true),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once when listing loads
  useEffect(() => {
    if (listing && !viewIncremented && !incrementView.isPending) {
      incrementView.mutate();
    }
  }, [listing, viewIncremented]);

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }
    navigate({
      to: "/messages",
      search: {
        listingId: id,
        sellerId: String(listing?.sellerId),
      } as Record<string, string>,
    });
  };

  const imageUrls = listing?.images.map((img) => img.getDirectURL()) ?? [
    "/assets/images/placeholder.svg",
  ];

  const handlePrevImg = () =>
    setActiveImg((i) => (i > 0 ? i - 1 : imageUrls.length - 1));
  const handleNextImg = () =>
    setActiveImg((i) => (i < imageUrls.length - 1 ? i + 1 : 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? handleNextImg() : handlePrevImg();
    touchStartX.current = null;
  };

  if (isLoading) {
    return (
      <div
        className="mx-auto max-w-screen-lg px-4 py-8"
        data-ocid="listing-detail.loading_state"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <LoadingSkeleton variant="card" count={1} />
          <div className="flex flex-col gap-3">
            <LoadingSkeleton variant="text" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="mx-auto max-w-screen-lg px-4 py-8">
        <EmptyState
          variant="error"
          title="Listing not found"
          description="This listing may have been removed or is no longer available."
          action={{
            label: "Browse Listings",
            onClick: () => navigate({ to: "/listings" }),
          }}
        />
      </div>
    );
  }

  const price = `₹ ${Number(listing.price).toLocaleString("en-IN")}`;
  const conditionLabel =
    conditionLabels[listing.condition] ?? listing.condition;
  const conditionClass =
    conditionColors[listing.condition] ?? conditionColors.fair;

  return (
    <div className="min-h-screen bg-background" data-ocid="listing-detail.page">
      <div className="mx-auto max-w-screen-lg px-4 py-6">
        {/* Back nav */}
        <button
          type="button"
          onClick={() => navigate({ to: "/listings" })}
          className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          data-ocid="listing-detail.back_button"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </button>

        {/* Main grid */}
        <div className="grid gap-8 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px]">
          {/* IMAGE GALLERY */}
          <div className="flex flex-col gap-3">
            <div
              className="group relative overflow-hidden rounded-2xl bg-muted shadow-md"
              style={{ aspectRatio: "4/3" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              data-ocid="listing-detail.primary_image"
            >
              <img
                src={imageUrls[activeImg] ?? "/assets/images/placeholder.svg"}
                alt={listing.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {imageUrls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImg}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-card"
                    data-ocid="listing-detail.img_prev"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImg}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-card"
                    data-ocid="listing-detail.img_next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {Array.from(
                      { length: imageUrls.length },
                      (_, dotIdx) => dotIdx,
                    ).map((dotIdx) => (
                      <button
                        key={`dot-${dotIdx}`}
                        type="button"
                        aria-label={`Image ${dotIdx + 1}`}
                        onClick={() => setActiveImg(dotIdx)}
                        className={`h-2 rounded-full transition-all ${
                          dotIdx === activeImg
                            ? "w-5 bg-primary-foreground"
                            : "w-2 bg-primary-foreground/50"
                        }`}
                        data-ocid={`listing-detail.dot.${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {imageUrls.length > 1 && (
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                data-ocid="listing-detail.thumbnail_strip"
              >
                {Array.from({ length: imageUrls.length }, (_, ti) => ti).map(
                  (ti) => (
                    <button
                      key={`thumb-${ti}`}
                      type="button"
                      onClick={() => setActiveImg(ti)}
                      aria-label={`View image ${ti + 1}`}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        activeImg === ti
                          ? "border-primary shadow-sm"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      data-ocid={`listing-detail.thumb.${ti + 1}`}
                    >
                      <img
                        src={imageUrls[ti]}
                        alt={`View ${ti + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          {/* DETAILS PANEL */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-1.5 flex items-start gap-2">
                <h1 className="flex-1 font-display text-2xl font-bold leading-tight text-foreground">
                  {listing.title}
                </h1>
                <Badge variant="outline" className="shrink-0 capitalize">
                  {listing.status}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-primary">{price}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-sm font-medium ${
                  conditionClass
                }`}
              >
                {conditionLabel}
              </span>
              <Badge variant="secondary" className="capitalize">
                <Tag className="mr-1 h-3 w-3" />
                {listing.category.replace(/([A-Z])/g, " $1").trim()}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" />
                {listing.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 shrink-0" />
                {Number(listing.viewCount).toLocaleString()} views
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 shrink-0" />
                {formatDate(listing.createdAt)}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Description
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {listing.description}
              </p>
            </div>

            <div
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
              data-ocid="listing-detail.seller_card"
            >
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Seller
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {sellerProfile?.avatarUrl ? (
                    <img
                      src={sellerProfile.avatarUrl}
                      alt={sellerProfile.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">
                    {sellerProfile?.name ?? "SareeMart Seller"}
                  </p>
                  {sellerProfile?.memberSince && (
                    <p className="text-xs text-muted-foreground">
                      Member since{" "}
                      {formatMemberSince(sellerProfile.memberSince)}
                    </p>
                  )}
                </div>
                <Link
                  to="/profile/$id"
                  params={{ id: String(listing.sellerId) }}
                  className="ml-auto shrink-0"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    data-ocid="listing-detail.seller_profile_button"
                  >
                    View
                  </Button>
                </Link>
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="w-full gap-2 text-base"
              onClick={handleContactSeller}
              data-ocid="listing-detail.contact_button"
            >
              <MessageCircle className="h-5 w-5" /> Contact Seller
            </Button>
          </div>
        </div>

        {/* SIMILAR ITEMS */}
        {similarListings && similarListings.length > 0 && (
          <section className="mt-12" data-ocid="listing-detail.similar_section">
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">
              Similar Items
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {similarListings.slice(0, 6).map((item, i) => (
                <ListingCard key={String(item.id)} listing={item} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Login prompt modal */}
      <Dialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <DialogContent
          className="max-w-sm"
          data-ocid="listing-detail.login_dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5 text-primary" /> Sign in to message
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Create a free account or sign in to contact this seller and start a
            conversation.
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setLoginPromptOpen(false);
                login();
              }}
              data-ocid="listing-detail.login_confirm_button"
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign in with Internet Identity
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setLoginPromptOpen(false)}
              data-ocid="listing-detail.login_cancel_button"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
