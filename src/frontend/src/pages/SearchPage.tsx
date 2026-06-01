import {
  CATEGORY_LABELS,
  CITY_OPTIONS,
  CONDITION_LABELS,
  FilterPanel,
} from "@/components/FilterPanel";
import type { ActiveFilters } from "@/components/FilterPanel";
import { ListingCard } from "@/components/ListingCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { ListingCategory, ListingCondition } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const PAGE_SIZE = 12;
const LOAD_MORE_STEP = 12;

function parseList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildFilter(
  keyword: string,
  categories: string[],
  conditions: string[],
  minPrice: string,
  maxPrice: string,
  location: string,
) {
  return {
    keyword: keyword || undefined,
    category:
      categories.length === 1 ? (categories[0] as ListingCategory) : undefined,
    condition:
      conditions.length === 1 ? (conditions[0] as ListingCondition) : undefined,
    location: location || undefined,
    minPrice: minPrice ? BigInt(Math.round(Number(minPrice))) : undefined,
    maxPrice: maxPrice ? BigInt(Math.round(Number(maxPrice))) : undefined,
  };
}

function sortItems<T extends { price: bigint; createdAt: bigint }>(
  items: T[],
  sort: string,
): T[] {
  const arr = [...items];
  if (sort === "newest")
    return arr.sort((a, b) => Number(b.createdAt - a.createdAt));
  if (sort === "price_asc")
    return arr.sort((a, b) => Number(a.price - b.price));
  if (sort === "price_desc")
    return arr.sort((a, b) => Number(b.price - a.price));
  return arr;
}

interface ZeroResultsProps {
  hasFilters: boolean;
  keyword?: string;
  fallbackItems?: import("@/backend").ListingPublic[];
  onClearFilters: () => void;
}

function ZeroResults({
  hasFilters,
  keyword,
  fallbackItems,
  onClearFilters,
}: ZeroResultsProps) {
  return (
    <div data-ocid="search.empty_state">
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {keyword
              ? `No results for \u201c${keyword}\u201d`
              : "No listings found"}
          </h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            {hasFilters
              ? "Try removing some filters or broadening your search."
              : "Try a different keyword or check back later."}
          </p>
        </div>
        {hasFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            data-ocid="search.empty_state.clear_button"
          >
            Remove all filters
          </Button>
        )}
      </div>
      {(fallbackItems?.length ?? 0) > 0 && (
        <div className="mt-2">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            You might like these
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {fallbackItems!.map((listing, i) => (
              <ListingCard
                key={String(listing.id)}
                listing={listing}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchPage() {
  const navigate = useNavigate();
  const params = useSearch({ from: "/search" });
  const { actor, isReady } = useBackend();

  const [localKeyword, setLocalKeyword] = useState(params.keyword ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeCategories = parseList(params.category);
  const activeConditions = parseList(params.condition);
  const currentSort = params.sort ?? "relevance";

  const [draftFilters, setDraftFilters] = useState<ActiveFilters>({
    categories: activeCategories,
    conditions: activeConditions,
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
    location: params.location ?? "",
  });

  useEffect(() => {
    setDraftFilters({
      categories: parseList(params.category),
      conditions: parseList(params.condition),
      minPrice: params.minPrice ?? "",
      maxPrice: params.maxPrice ?? "",
      location: params.location ?? "",
    });
    setLocalKeyword(params.keyword ?? "");
    setVisibleCount(PAGE_SIZE);
  }, [
    params.keyword,
    params.category,
    params.condition,
    params.minPrice,
    params.maxPrice,
    params.location,
  ]);

  const handleKeywordChange = (value: string) => {
    setLocalKeyword(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate({
        to: "/search",
        search: { ...params, keyword: value || undefined },
      });
    }, 300);
  };

  const applyFilters = (filters: ActiveFilters, close = false) => {
    navigate({
      to: "/search",
      search: {
        keyword: params.keyword,
        category: filters.categories.join(",") || undefined,
        condition: filters.conditions.join(",") || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        location: filters.location || undefined,
        sort: currentSort !== "relevance" ? currentSort : undefined,
      },
    });
    if (close) setShowMobileFilters(false);
  };

  const resetFilters = () => {
    const cleared: ActiveFilters = {
      categories: [],
      conditions: [],
      minPrice: "",
      maxPrice: "",
      location: "",
    };
    setDraftFilters(cleared);
    navigate({
      to: "/search",
      search: {
        keyword: params.keyword,
        category: undefined,
        condition: undefined,
        location: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: currentSort !== "relevance" ? currentSort : undefined,
      },
    });
    setShowMobileFilters(false);
  };

  const updateSort = (sort: string) => {
    navigate({
      to: "/search",
      search: { ...params, sort: sort !== "relevance" ? sort : undefined },
    });
  };

  const filter = useMemo(
    () =>
      buildFilter(
        params.keyword ?? "",
        activeCategories,
        activeConditions,
        params.minPrice ?? "",
        params.maxPrice ?? "",
        params.location ?? "",
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      params.keyword,
      activeCategories,
      activeConditions,
      params.minPrice,
      params.maxPrice,
      params.location,
    ],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["search", filter],
    queryFn: async () => {
      if (!actor) return { total: BigInt(0), items: [] };
      return actor.searchListings(filter, BigInt(0), BigInt(200));
    },
    enabled: isReady,
  });

  const { data: featuredData } = useQuery({
    queryKey: ["featured", "search-fallback"],
    queryFn: async () => {
      if (!actor) return { total: BigInt(0), items: [] };
      return actor.getFeaturedListings(BigInt(0), BigInt(4));
    },
    enabled: isReady && !isLoading && (data?.items?.length ?? 0) === 0,
  });

  const allItems = useMemo(
    () => sortItems(data?.items ?? [], currentSort),
    [data?.items, currentSort],
  );

  const visibleItems = allItems.slice(0, visibleCount);
  const total = allItems.length;
  const hasMore = visibleCount < total;

  const activeFilterCount =
    activeCategories.length +
    activeConditions.length +
    (params.minPrice || params.maxPrice ? 1 : 0) +
    (params.location ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6" data-ocid="search.page">
      {/* Search bar */}
      <div className="mb-5 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={localKeyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            placeholder="Search sarees, lehengas, kurtis..."
            className="h-10 pl-9"
            data-ocid="search.keyword_input"
          />
          {localKeyword && (
            <button
              type="button"
              onClick={() => handleKeywordChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          className="relative h-10 gap-1.5 lg:hidden"
          onClick={() => setShowMobileFilters(true)}
          data-ocid="search.mobile_filters_button"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 flex-shrink-0 lg:block">
          <div className="sticky top-4 rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Filters</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-primary hover:underline"
                  data-ocid="search.filter.clear_all"
                >
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={() => applyFilters(draftFilters)}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main results */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-sm text-muted-foreground"
              data-ocid="search.result_count"
            >
              {isLoading ? (
                <span className="inline-block h-4 w-24 animate-pulse rounded bg-muted" />
              ) : total > 0 ? (
                <>
                  <span className="font-semibold text-foreground">
                    {total.toLocaleString()}
                  </span>{" "}
                  {total === 1 ? "result" : "results"}
                  {params.keyword && <> for &ldquo;{params.keyword}&rdquo;</>}
                </>
              ) : null}
            </p>
            <Select value={currentSort} onValueChange={updateSort}>
              <SelectTrigger
                className="h-9 w-auto min-w-[160px] text-sm"
                data-ocid="search.sort_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div
              className="mb-4 flex flex-wrap gap-1.5"
              data-ocid="search.active_filters"
            >
              {activeCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1.5 text-xs"
                  onClick={() =>
                    navigate({
                      to: "/search",
                      search: {
                        ...params,
                        category:
                          activeCategories.filter((c) => c !== cat).join(",") ||
                          undefined,
                      },
                    })
                  }
                  data-ocid={`search.chip.category.${cat}`}
                >
                  {CATEGORY_LABELS[cat]}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {activeConditions.map((cond) => (
                <Badge
                  key={cond}
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1.5 text-xs"
                  onClick={() =>
                    navigate({
                      to: "/search",
                      search: {
                        ...params,
                        condition:
                          activeConditions
                            .filter((c) => c !== cond)
                            .join(",") || undefined,
                      },
                    })
                  }
                  data-ocid={`search.chip.condition.${cond}`}
                >
                  {CONDITION_LABELS[cond]}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {(params.minPrice || params.maxPrice) && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1.5 text-xs"
                  onClick={() =>
                    navigate({
                      to: "/search",
                      search: {
                        ...params,
                        minPrice: undefined,
                        maxPrice: undefined,
                      },
                    })
                  }
                  data-ocid="search.chip.price_range"
                >
                  ₹{params.minPrice ?? "0"}–₹{params.maxPrice ?? "∞"}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {params.location && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1.5 text-xs"
                  onClick={() =>
                    navigate({
                      to: "/search",
                      search: { ...params, location: undefined },
                    })
                  }
                  data-ocid="search.chip.location"
                >
                  {CITY_OPTIONS.find((c) => c === params.location) ??
                    params.location}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              <Badge
                variant="outline"
                className="cursor-pointer gap-1 pr-1.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={resetFilters}
                data-ocid="search.chip.clear_all"
              >
                Clear all
                <X className="h-3 w-3" />
              </Badge>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              <LoadingSkeleton variant="card" count={8} className="contents" />
            </div>
          ) : total === 0 ? (
            <ZeroResults
              hasFilters={hasActiveFilters}
              keyword={params.keyword}
              fallbackItems={featuredData?.items}
              onClearFilters={resetFilters}
            />
          ) : (
            <>
              <div
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                data-ocid="search.results_list"
              >
                {visibleItems.map((listing, i) => (
                  <ListingCard
                    key={String(listing.id)}
                    listing={listing}
                    index={i}
                  />
                ))}
              </div>
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="min-w-[160px]"
                    onClick={() => setVisibleCount((n) => n + LOAD_MORE_STEP)}
                    data-ocid="search.load_more_button"
                  >
                    Load more ({total - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-2xl"
          data-ocid="search.mobile_filter_sheet"
        >
          <SheetHeader className="mb-4">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FilterPanel
            filters={draftFilters}
            onChange={setDraftFilters}
            onApply={() => applyFilters(draftFilters, true)}
            onReset={resetFilters}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
