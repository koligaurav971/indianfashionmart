import { c as createLucideIcon, k as useParams, u as useBackend, b as useNavigate, d as useQuery, j as jsxRuntimeExports, f as LoadingSkeleton, M as MapPin, h as Badge } from "./index-Dr8JVVcG.js";
import { E as EmptyState } from "./EmptyState-IDONVZ2G.js";
import { L as ListingCard } from "./ListingCard-1ZreHz5B.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cn4NaR2n.js";
import { A as ArrowLeft } from "./arrow-left-COh7_ffz.js";
import { C as Calendar } from "./calendar-DoNsdozq.js";
import { P as Package } from "./package-DVzuDw11.js";
import "./package-search-BPFiuX8y.js";
import "./index-Cm6drL5V.js";
import "./index-DaH7mVTZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const Grid3x3 = createLucideIcon("grid-3x3", __iconNode);
function PublicProfilePage() {
  var _a, _b, _c;
  const { id } = useParams({ from: "/profile/$id" });
  const { actor, isReady } = useBackend();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: async () => {
      if (!actor) return null;
      const principal = { toString: () => id };
      return actor.getUserProfile(principal);
    },
    enabled: isReady && !!id
  });
  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ["seller-listings", id],
    queryFn: async () => {
      if (!actor) return null;
      const principal = { toString: () => id };
      return actor.getListingsBySeller(principal, BigInt(0), BigInt(12));
    },
    enabled: isReady && !!id
  });
  const initials = ((profile == null ? void 0 : profile.name) ?? "U").slice(0, 2).toUpperCase();
  const memberDate = profile ? new Date(
    Number(profile.memberSince / BigInt(1e6))
  ).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "";
  const listingCount = ((_a = listings == null ? void 0 : listings.items) == null ? void 0 : _a.length) ?? 0;
  const activeCount = ((_b = listings == null ? void 0 : listings.items) == null ? void 0 : _b.filter((l) => l.status === "active").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-screen-md px-4 py-8",
      "data-ocid": "public-profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/listings" }),
            className: "mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "public-profile.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Back to listings"
            ]
          }
        ),
        profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoadingSkeleton,
          {
            variant: "avatar",
            count: 3,
            className: "flex flex-col gap-4"
          }
        ) : !profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { variant: "error", title: "User not found" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-xs overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-gradient-to-r from-primary to-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-24 w-24 ring-4 ring-background shadow-md flex-shrink-0", children: [
                profile.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatarUrl, alt: profile.name }) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-2xl font-bold bg-primary/15 text-primary", children: initials })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: profile.name }),
                profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-prose", children: profile.bio }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground", children: [
                  profile.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary flex-shrink-0" }),
                    profile.location
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 flex-shrink-0" }),
                    "Member since ",
                    memberDate
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: listingCount }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: "listings" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-4 w-4 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: activeCount }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: "active" })
                    ] })
                  ] })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground", children: [
                "Listings by ",
                profile.name
              ] }),
              listingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                listingCount,
                " item",
                listingCount !== 1 ? "s" : ""
              ] })
            ] }),
            listingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card", count: 6 }) }) : !((_c = listings == null ? void 0 : listings.items) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                title: "No active listings",
                description: "This seller hasn't posted any items yet."
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 gap-4 sm:grid-cols-3",
                "data-ocid": "public-profile.listings_grid",
                children: listings.items.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ListingCard,
                  {
                    listing,
                    index: i
                  },
                  String(listing.id)
                ))
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  PublicProfilePage
};
