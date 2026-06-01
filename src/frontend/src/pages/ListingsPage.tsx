import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBackend } from "@/hooks/useBackend";
import { ListingCategory, ListingCondition } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES: { value: string; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "✨" },
  { value: ListingCategory.sarees, label: "Sarees", icon: "🥻" },
  { value: ListingCategory.lehengas, label: "Lehengas", icon: "👗" },
  { value: ListingCategory.kurtis, label: "Kurtis", icon: "👚" },
  { value: ListingCategory.salwarSuits, label: "Salwar Suits", icon: "🧣" },
  { value: ListingCategory.jewelry, label: "Jewellery", icon: "💍" },
  { value: ListingCategory.accessories, label: "Accessories", icon: "👜" },
  { value: ListingCategory.footwear, label: "Footwear", icon: "👡" },
  { value: ListingCategory.other, label: "Other", icon: "📦" },
];

const CONDITIONS = [
  { value: "all", label: "Any Condition" },
  { value: ListingCondition.brandNew, label: "Brand New" },
  { value: ListingCondition.likeNew, label: "Like New" },
  { value: ListingCondition.good, label: "Good" },
  { value: ListingCondition.fair, label: "Fair" },
  { value: ListingCondition.poor, label: "Poor" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const LIMIT = 12;

interface Filters {
  category: string;
  condition: string;
  keyword: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  sort: string;
}

const defaultFilters: Filters = {
  category: "all",
  condition: "all",
  keyword: "",
  minPrice: "",
  maxPrice: "",
  location: "",
  sort: "newest",
};

function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  onApply?: () => void;
  onReset: () => void;
}) {
  const set = (key: keyof Filters, value: string) =>
    onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Condition
        </Label>
        <div className="mt-2 flex flex-col gap-1">
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => set("condition", c.value)}
              className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                filters.condition === c.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
              data-ocid={`listings.filter_condition_${c.value}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Price Range (₹)
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => set("minPrice", e.target.value)}
            className="text-sm"
            data-ocid="listings.filter_min_price"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => set("maxPrice", e.target.value)}
            className="text-sm"
            data-ocid="listings.filter_max_price"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Location
        </Label>
        <Input
          placeholder="e.g. Mumbai"
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
          className="mt-2 text-sm"
          data-ocid="listings.filter_location"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          className="flex-1 text-sm"
          onClick={onReset}
          data-ocid="listings.filter_reset"
        >
          <X className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
        {onApply && (
          <Button
            type="button"
            className="flex-1 text-sm"
            onClick={onApply}
            data-ocid="listings.filter_apply"
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
}

export function ListingsPage() {
  const { actor, isReady } = useBackend();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(defaultFilters);
  const [offset, setOffset] = useState(0);
  const [accItems, setAccItems] = useState<
    NonNullable<
      Awaited<ReturnType<NonNullable<typeof actor>["searchListings"]>>
    >["items"]
  >([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const buildFilter = (f: Filters) => ({
    keyword: f.keyword.trim() || undefined,
    category:
      f.category !== "all" ? (f.category as ListingCategory) : undefined,
    condition:
      f.condition !== "all" ? (f.condition as ListingCondition) : undefined,
    minPrice: f.minPrice ? BigInt(Math.round(Number(f.minPrice))) : undefined,
    maxPrice: f.maxPrice ? BigInt(Math.round(Number(f.maxPrice))) : undefined,
    location: f.location.trim() || undefined,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listings-search", appliedFilters, offset],
    queryFn: async () => {
      if (!actor) return null;
      return actor.searchListings(
        buildFilter(appliedFilters),
        BigInt(offset),
        BigInt(LIMIT),
      );
    },
    enabled: isReady,
  });

  const total = Number(data?.total ?? 0);
  const pageItems = data?.items ?? [];
  const displayItems = offset === 0 ? pageItems : [...accItems, ...pageItems];
  const hasMore = displayItems.length < total;

  const applyFilters = (newFilters = filters) => {
    setAccItems([]);
    setOffset(0);
    setAppliedFilters(newFilters);
    setMobileFilterOpen(false);
  };

  const handleLoadMore = () => {
    setAccItems(displayItems);
    setOffset((prev) => prev + LIMIT);
  };

  const handleSearch = () => {
    const nf = { ...filters, keyword: searchInput };
    setFilters(nf);
    applyFilters(nf);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSearchInput("");
    applyFilters(defaultFilters);
  };

  const handleCategorySelect = (cat: string) => {
    const nf = { ...filters, category: cat };
    setFilters(nf);
    applyFilters(nf);
  };

  const handleSortChange = (sort: string) => {
    const nf = { ...filters, sort };
    setFilters(nf);
    applyFilters(nf);
  };

  const activeFilterCount = [
    appliedFilters.condition !== "all",
    !!appliedFilters.minPrice,
    !!appliedFilters.maxPrice,
    !!appliedFilters.location,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background" data-ocid="listings.page">
      {/* Search + sort bar */}
      <div className="border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-screen-xl items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sarees, lehengas, kurtis…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9 pr-4"
              data-ocid="listings.search_input"
            />
          </div>
          <Button
            type="button"
            onClick={handleSearch}
            className="hidden sm:flex"
            data-ocid="listings.search_button"
          >
            <Search className="h-4 w-4" />
          </Button>
          {/* Mobile filter button */}
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1.5 lg:hidden"
            onClick={() => setMobileFilterOpen(true)}
            data-ocid="listings.mobile_filter_button"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Select value={appliedFilters.sort} onValueChange={handleSortChange}>
            <SelectTrigger
              className="w-44 shrink-0"
              data-ocid="listings.sort_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  data-ocid={`listings.sort_${o.value}`}
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category chips */}
      <div className="border-b border-border bg-card/60">
        <div className="mx-auto max-w-screen-xl overflow-x-auto">
          <div
            className="flex gap-2 px-4 py-2.5"
            data-ocid="listings.category_chips"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategorySelect(cat.value)}
                data-ocid={`listings.category_${cat.value}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-all ${
                  appliedFilters.category === cat.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside
            className="hidden w-56 shrink-0 lg:block"
            data-ocid="listings.filter_sidebar"
          >
            <div className="sticky top-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Filters</h2>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onReset={handleReset}
                onApply={() => applyFilters()}
              />
            </div>
          </aside>

          {/* Results */}
          <main className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p
                className="text-sm text-muted-foreground"
                data-ocid="listings.result_count"
              >
                {isLoading
                  ? "Searching…"
                  : `${total.toLocaleString()} item${total !== 1 ? "s" : ""}${
                      appliedFilters.keyword
                        ? ` for "${appliedFilters.keyword}"`
                        : ""
                    }`}
              </p>
              {appliedFilters.category !== "all" && (
                <Badge variant="outline" className="capitalize">
                  {
                    CATEGORIES.find((c) => c.value === appliedFilters.category)
                      ?.label
                  }
                </Badge>
              )}
            </div>

            {isLoading && offset === 0 ? (
              <div
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                data-ocid="listings.loading_state"
              >
                {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                  <div key={`sk-${i}`}>
                    <LoadingSkeleton variant="card" count={1} />
                  </div>
                ))}
              </div>
            ) : displayItems.length === 0 ? (
              <EmptyState
                variant="search"
                title="No listings found"
                description="Try adjusting your filters or search terms."
                action={{ label: "Clear Filters", onClick: handleReset }}
              />
            ) : (
              <>
                <div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                  data-ocid="listings.list"
                >
                  {displayItems.map((listing, i) => (
                    <ListingCard
                      key={String(listing.id)}
                      listing={listing}
                      index={i}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div
                    className="mt-8 flex justify-center"
                    data-ocid="listings.load_more"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="px-8"
                      disabled={isFetching}
                      onClick={handleLoadMore}
                      data-ocid="listings.load_more_button"
                    >
                      {isFetching
                        ? "Loading…"
                        : `Load More (${total - displayItems.length} more)`}
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto rounded-t-2xl"
          data-ocid="listings.filter_sheet"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </SheetTitle>
          </SheetHeader>
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onReset={handleReset}
            onApply={() => applyFilters()}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
