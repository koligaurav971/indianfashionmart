import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListingCategory, ListingCondition } from "@/types";
import type { SellFormData, UploadedImage } from "./types";

const CATEGORY_LABELS: Record<string, string> = {
  [ListingCategory.sarees]: "Sarees",
  [ListingCategory.kurtis]: "Kurtis",
  [ListingCategory.lehengas]: "Lehengas",
  [ListingCategory.salwarSuits]: "Salwar Suits",
  [ListingCategory.jewelry]: "Jewelry",
  [ListingCategory.accessories]: "Accessories",
  [ListingCategory.footwear]: "Footwear",
  [ListingCategory.other]: "Other",
};

const CONDITION_LABELS: Record<string, string> = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor",
};

interface SectionCardProps {
  title: string;
  onEdit: () => void;
  ocid: string;
  children: React.ReactNode;
}

function SectionCard({ title, onEdit, ocid, children }: SectionCardProps) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-4"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={onEdit}
          data-ocid={`${ocid}.edit_button`}
        >
          Edit
        </Button>
      </div>
      {children}
    </div>
  );
}

interface Props {
  data: SellFormData;
  images: UploadedImage[];
  onGoToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submittedListingId: string | null;
  onPostAnother: () => void;
}

export function Step4Review({
  data,
  images,
  onGoToStep,
  onSubmit,
  isSubmitting,
  submittedListingId,
  onPostAnother,
}: Props) {
  if (submittedListingId) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-6 py-10 text-center"
        data-ocid="sell.success_screen"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Listing Posted!
          </h2>
          <p className="text-muted-foreground text-sm">
            Your item is now live and visible to buyers.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button
            asChild
            className="flex-1"
            data-ocid="sell.view_listing_button"
          >
            <a href={`/listings/${submittedListingId}`}>View Listing</a>
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={onPostAnother}
            className="flex-1"
            data-ocid="sell.post_another_button"
          >
            Post Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Item Details */}
      <SectionCard
        title="Item Details"
        onEdit={() => onGoToStep(1)}
        ocid="sell.review_details"
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">{data.title}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {CATEGORY_LABELS[data.category] ?? data.category}
            </Badge>
            <Badge variant="outline">
              {CONDITION_LABELS[data.condition] ?? data.condition}
            </Badge>
          </div>
          <p className="text-lg font-bold text-primary">
            ₹{Number(data.price).toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {data.description}
          </p>
        </div>
      </SectionCard>

      {/* Location & Contact */}
      <SectionCard
        title="Location & Contact"
        onEdit={() => onGoToStep(2)}
        ocid="sell.review_location"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm text-foreground">📍 {data.location}</p>
          <p className="text-sm text-muted-foreground">+91 {data.phone}</p>
          {data.email && (
            <p className="text-sm text-muted-foreground">{data.email}</p>
          )}
        </div>
      </SectionCard>

      {/* Images */}
      <SectionCard
        title={`Images (${images.length})`}
        onEdit={() => onGoToStep(3)}
        ocid="sell.review_images"
      >
        {images.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={img.previewUrl}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 text-center bg-primary/90 text-primary-foreground text-xs py-0.5">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No images — consider adding some for more visibility.
          </p>
        )}
      </SectionCard>

      {/* Submit */}
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full h-12 text-base font-semibold mt-2"
        data-ocid="sell.submit_button"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Posting...
          </span>
        ) : (
          "Post Listing"
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By posting you agree to our terms. Your listing will be visible to
        buyers immediately.
      </p>
    </div>
  );
}
