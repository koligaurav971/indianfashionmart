import { c as createLucideIcon, i as ListingCondition, j as jsxRuntimeExports, L as Link, a as cn, M as MapPin } from "./index-Dr8JVVcG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const conditionLabels = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor"
};
const conditionVariants = {
  [ListingCondition.brandNew]: "bg-accent/20 text-accent-foreground border-accent/30",
  [ListingCondition.likeNew]: "bg-accent/15 text-accent-foreground border-accent/20",
  [ListingCondition.good]: "bg-primary/15 text-primary border-primary/20",
  [ListingCondition.fair]: "bg-muted text-muted-foreground border-border",
  [ListingCondition.poor]: "bg-destructive/10 text-destructive border-destructive/20"
};
function formatPrice(price) {
  return `₹ ${Number(price).toLocaleString("en-IN")}`;
}
function formatDate(ts) {
  const ms = Number(ts / BigInt(1e6));
  const date = new Date(ms);
  const now = Date.now();
  const diff = now - date.getTime();
  if (diff < 864e5) return "Today";
  if (diff < 1728e5) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function ListingCard({
  listing,
  index = 0,
  className
}) {
  var _a;
  const imageUrl = ((_a = listing.images[0]) == null ? void 0 : _a.getDirectURL()) ?? "/assets/images/placeholder.svg";
  const conditionLabel = conditionLabels[listing.condition] ?? listing.condition;
  const conditionClass = conditionVariants[listing.condition] ?? conditionVariants[ListingCondition.fair];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/listings/$id",
      params: { id: String(listing.id) },
      "data-ocid": `listing.item.${index + 1}`,
      className: cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: listing.title,
              className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "rounded-full border px-2 py-0.5 text-xs font-medium",
                conditionClass
              ),
              children: conditionLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1.5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-sm font-semibold text-foreground leading-snug", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: formatPrice(listing.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: listing.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              formatDate(listing.createdAt)
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ListingCard as L
};
