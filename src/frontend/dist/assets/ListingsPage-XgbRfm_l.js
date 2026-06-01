import { c as createLucideIcon, u as useBackend, r as reactExports, d as useQuery, j as jsxRuntimeExports, S as Search, I as Input, B as Button, e as ListingCategory, h as Badge, f as LoadingSkeleton, i as ListingCondition, X } from "./index-Dr8JVVcG.js";
import { E as EmptyState } from "./EmptyState-IDONVZ2G.js";
import { L as ListingCard } from "./ListingCard-1ZreHz5B.js";
import { L as Label } from "./label-DN2e6yyu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BkZZAwO4.js";
import { S as SlidersHorizontal, a as Sheet, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-Cg1uNe37.js";
import "./package-search-BPFiuX8y.js";
import "./index-DaH7mVTZ.js";
import "./index-D_V4n8IO.js";
import "./index-Cm6drL5V.js";
import "./index-Dec0p2H1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const CATEGORIES = [
  { value: "all", label: "All", icon: "✨" },
  { value: ListingCategory.sarees, label: "Sarees", icon: "🥻" },
  { value: ListingCategory.lehengas, label: "Lehengas", icon: "👗" },
  { value: ListingCategory.kurtis, label: "Kurtis", icon: "👚" },
  { value: ListingCategory.salwarSuits, label: "Salwar Suits", icon: "🧣" },
  { value: ListingCategory.jewelry, label: "Jewellery", icon: "💍" },
  { value: ListingCategory.accessories, label: "Accessories", icon: "👜" },
  { value: ListingCategory.footwear, label: "Footwear", icon: "👡" },
  { value: ListingCategory.other, label: "Other", icon: "📦" }
];
const CONDITIONS = [
  { value: "all", label: "Any Condition" },
  { value: ListingCondition.brandNew, label: "Brand New" },
  { value: ListingCondition.likeNew, label: "Like New" },
  { value: ListingCondition.good, label: "Good" },
  { value: ListingCondition.fair, label: "Fair" },
  { value: ListingCondition.poor, label: "Poor" }
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" }
];
const LIMIT = 12;
const defaultFilters = {
  category: "all",
  condition: "all",
  keyword: "",
  minPrice: "",
  maxPrice: "",
  location: "",
  sort: "newest"
};
function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onReset
}) {
  const set = (key, value) => onFiltersChange({ ...filters, [key]: value });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-col gap-1", children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => set("condition", c.value),
          className: `rounded-md px-3 py-1.5 text-left text-sm transition-colors ${filters.condition === c.value ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`,
          "data-ocid": `listings.filter_condition_${c.value}`,
          children: c.label
        },
        c.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Price Range (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Min",
            value: filters.minPrice,
            onChange: (e) => set("minPrice", e.target.value),
            className: "text-sm",
            "data-ocid": "listings.filter_min_price"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Max",
            value: filters.maxPrice,
            onChange: (e) => set("maxPrice", e.target.value),
            className: "text-sm",
            "data-ocid": "listings.filter_max_price"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "e.g. Mumbai",
          value: filters.location,
          onChange: (e) => set("location", e.target.value),
          className: "mt-2 text-sm",
          "data-ocid": "listings.filter_location"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 text-sm",
          onClick: onReset,
          "data-ocid": "listings.filter_reset",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-1.5 h-3.5 w-3.5" }),
            " Reset"
          ]
        }
      ),
      onApply && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: "flex-1 text-sm",
          onClick: onApply,
          "data-ocid": "listings.filter_apply",
          children: "Apply"
        }
      )
    ] })
  ] });
}
function ListingsPage() {
  var _a;
  const { actor, isReady } = useBackend();
  const [filters, setFilters] = reactExports.useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = reactExports.useState(defaultFilters);
  const [offset, setOffset] = reactExports.useState(0);
  const [accItems, setAccItems] = reactExports.useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = reactExports.useState(false);
  const [searchInput, setSearchInput] = reactExports.useState("");
  const buildFilter = (f) => ({
    keyword: f.keyword.trim() || void 0,
    category: f.category !== "all" ? f.category : void 0,
    condition: f.condition !== "all" ? f.condition : void 0,
    minPrice: f.minPrice ? BigInt(Math.round(Number(f.minPrice))) : void 0,
    maxPrice: f.maxPrice ? BigInt(Math.round(Number(f.maxPrice))) : void 0,
    location: f.location.trim() || void 0
  });
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listings-search", appliedFilters, offset],
    queryFn: async () => {
      if (!actor) return null;
      return actor.searchListings(
        buildFilter(appliedFilters),
        BigInt(offset),
        BigInt(LIMIT)
      );
    },
    enabled: isReady
  });
  const total = Number((data == null ? void 0 : data.total) ?? 0);
  const pageItems = (data == null ? void 0 : data.items) ?? [];
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
  const handleCategorySelect = (cat) => {
    const nf = { ...filters, category: cat };
    setFilters(nf);
    applyFilters(nf);
  };
  const handleSortChange = (sort) => {
    const nf = { ...filters, sort };
    setFilters(nf);
    applyFilters(nf);
  };
  const activeFilterCount = [
    appliedFilters.condition !== "all",
    !!appliedFilters.minPrice,
    !!appliedFilters.maxPrice,
    !!appliedFilters.location
  ].filter(Boolean).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "listings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-screen-xl items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search sarees, lehengas, kurtis…",
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSearch(),
            className: "pl-9 pr-4",
            "data-ocid": "listings.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleSearch,
          className: "hidden sm:flex",
          "data-ocid": "listings.search_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex items-center gap-1.5 lg:hidden",
          onClick: () => setMobileFilterOpen(true),
          "data-ocid": "listings.mobile_filter_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Filters" }),
            activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground", children: activeFilterCount })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: appliedFilters.sort, onValueChange: handleSortChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-44 shrink-0",
            "data-ocid": "listings.sort_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectItem,
          {
            value: o.value,
            "data-ocid": `listings.sort_${o.value}`,
            children: o.label
          },
          o.value
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-screen-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 px-4 py-2.5",
        "data-ocid": "listings.category_chips",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleCategorySelect(cat.value),
            "data-ocid": `listings.category_${cat.value}`,
            className: `flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-all ${appliedFilters.category === cat.value ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
            ]
          },
          cat.value
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-screen-xl px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden w-56 shrink-0 lg:block",
          "data-ocid": "listings.filter_sidebar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-4 rounded-xl border border-border bg-card p-4 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Filters" }),
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: activeFilterCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterPanel,
              {
                filters,
                onFiltersChange: setFilters,
                onReset: handleReset,
                onApply: () => applyFilters()
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground",
              "data-ocid": "listings.result_count",
              children: isLoading ? "Searching…" : `${total.toLocaleString()} item${total !== 1 ? "s" : ""}${appliedFilters.keyword ? ` for "${appliedFilters.keyword}"` : ""}`
            }
          ),
          appliedFilters.category !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: (_a = CATEGORIES.find((c) => c.value === appliedFilters.category)) == null ? void 0 : _a.label })
        ] }),
        isLoading && offset === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4",
            "data-ocid": "listings.loading_state",
            children: Array.from({ length: 12 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card", count: 1 }) }, `sk-${i}`))
          }
        ) : displayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            variant: "search",
            title: "No listings found",
            description: "Try adjusting your filters or search terms.",
            action: { label: "Clear Filters", onClick: handleReset }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4",
              "data-ocid": "listings.list",
              children: displayItems.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ListingCard,
                {
                  listing,
                  index: i
                },
                String(listing.id)
              ))
            }
          ),
          hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mt-8 flex justify-center",
              "data-ocid": "listings.load_more",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "px-8",
                  disabled: isFetching,
                  onClick: handleLoadMore,
                  "data-ocid": "listings.load_more_button",
                  children: isFetching ? "Loading…" : `Load More (${total - displayItems.length} more)`
                }
              )
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: mobileFilterOpen, onOpenChange: setMobileFilterOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "bottom",
        className: "max-h-[90vh] overflow-y-auto rounded-t-2xl",
        "data-ocid": "listings.filter_sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            " Filters"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterPanel,
            {
              filters,
              onFiltersChange: setFilters,
              onReset: handleReset,
              onApply: () => applyFilters()
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  ListingsPage
};
