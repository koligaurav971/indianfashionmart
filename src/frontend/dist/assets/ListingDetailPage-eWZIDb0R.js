import { c as createLucideIcon, k as useParams, u as useBackend, l as useAuth, b as useNavigate, r as reactExports, d as useQuery, j as jsxRuntimeExports, f as LoadingSkeleton, h as Badge, M as MapPin, U as User, L as Link, B as Button, g as MessageCircle, m as LogIn } from "./index-gsR6w5On.js";
import { E as EmptyState } from "./EmptyState-BPohb3Z8.js";
import { L as ListingCard } from "./ListingCard-DPbdLi2L.js";
import { E as Eye, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BQDDqcA4.js";
import { u as useMutation } from "./useMutation-Bi8NVf3W.js";
import { A as ArrowLeft } from "./arrow-left-BUFZL2ro.js";
import { C as Calendar } from "./calendar-Dp-QUm-L.js";
import "./package-search-D9olYAaU.js";
import "./index-Rc_OAgpw.js";
import "./index-BnjX19SW.js";
import "./index-T7DfQMot.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const conditionLabels = {
  likeNew: "Like New",
  brandNew: "Brand New",
  good: "Good",
  fair: "Fair",
  poor: "Poor"
};
const conditionColors = {
  brandNew: "bg-accent/20 text-accent-foreground border-accent/30",
  likeNew: "bg-accent/15 text-accent-foreground border-accent/20",
  good: "bg-primary/15 text-primary border-primary/20",
  fair: "bg-muted text-muted-foreground border-border",
  poor: "bg-destructive/10 text-destructive border-destructive/20"
};
function formatDate(ts) {
  return new Date(Number(ts / BigInt(1e6))).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatMemberSince(ts) {
  return new Date(Number(ts / BigInt(1e6))).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  });
}
function ListingDetailPage() {
  var _a;
  const { id } = useParams({ from: "/listings/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [viewIncremented, setViewIncremented] = reactExports.useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = reactExports.useState(false);
  const touchStartX = reactExports.useRef(null);
  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      const result = await (actor == null ? void 0 : actor.getListing(BigInt(id)));
      return result ?? null;
    },
    enabled: isReady && !!id
  });
  const { data: sellerProfile } = useQuery({
    queryKey: ["user-profile", (_a = listing == null ? void 0 : listing.sellerId) == null ? void 0 : _a.toString()],
    queryFn: async () => {
      if (!actor || !listing) return null;
      return actor.getUserProfile(listing.sellerId);
    },
    enabled: isReady && !!listing
  });
  const { data: similarListings } = useQuery({
    queryKey: ["similar", listing == null ? void 0 : listing.category, id],
    queryFn: async () => {
      if (!actor || !listing) return null;
      const result = await actor.getSimilarListings(
        listing.category,
        listing.location,
        BigInt(id),
        BigInt(0),
        BigInt(6)
      );
      return (result == null ? void 0 : result.items) ?? [];
    },
    enabled: isReady && !!listing
  });
  const incrementView = useMutation({
    mutationFn: async () => actor == null ? void 0 : actor.incrementListingViewCount(BigInt(id)),
    onSuccess: () => setViewIncremented(true)
  });
  reactExports.useEffect(() => {
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
        sellerId: String(listing == null ? void 0 : listing.sellerId)
      }
    });
  };
  const imageUrls = (listing == null ? void 0 : listing.images.map((img) => img.getDirectURL())) ?? [
    "/assets/images/placeholder.svg"
  ];
  const handlePrevImg = () => setActiveImg((i) => i > 0 ? i - 1 : imageUrls.length - 1);
  const handleNextImg = () => setActiveImg((i) => i < imageUrls.length - 1 ? i + 1 : 0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? handleNextImg() : handlePrevImg();
    touchStartX.current = null;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mx-auto max-w-screen-lg px-4 py-8",
        "data-ocid": "listing-detail.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card", count: 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "text", count: 3 }) })
        ] })
      }
    );
  }
  if (!listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-screen-lg px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        variant: "error",
        title: "Listing not found",
        description: "This listing may have been removed or is no longer available.",
        action: {
          label: "Browse Listings",
          onClick: () => navigate({ to: "/listings" })
        }
      }
    ) });
  }
  const price = `₹ ${Number(listing.price).toLocaleString("en-IN")}`;
  const conditionLabel = conditionLabels[listing.condition] ?? listing.condition;
  const conditionClass = conditionColors[listing.condition] ?? conditionColors.fair;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "listing-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-screen-lg px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/listings" }),
          className: "mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
          "data-ocid": "listing-detail.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to listings"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "group relative overflow-hidden rounded-2xl bg-muted shadow-md",
              style: { aspectRatio: "4/3" },
              onTouchStart: handleTouchStart,
              onTouchEnd: handleTouchEnd,
              "data-ocid": "listing-detail.primary_image",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imageUrls[activeImg] ?? "/assets/images/placeholder.svg",
                    alt: listing.title,
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  }
                ),
                imageUrls.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handlePrevImg,
                      "aria-label": "Previous image",
                      className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-card",
                      "data-ocid": "listing-detail.img_prev",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleNextImg,
                      "aria-label": "Next image",
                      className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-card",
                      "data-ocid": "listing-detail.img_next",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5", children: Array.from(
                    { length: imageUrls.length },
                    (_, dotIdx) => dotIdx
                  ).map((dotIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Image ${dotIdx + 1}`,
                      onClick: () => setActiveImg(dotIdx),
                      className: `h-2 rounded-full transition-all ${dotIdx === activeImg ? "w-5 bg-primary-foreground" : "w-2 bg-primary-foreground/50"}`,
                      "data-ocid": `listing-detail.dot.${dotIdx + 1}`
                    },
                    `dot-${dotIdx}`
                  )) })
                ] })
              ]
            }
          ),
          imageUrls.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 overflow-x-auto pb-1",
              "data-ocid": "listing-detail.thumbnail_strip",
              children: Array.from({ length: imageUrls.length }, (_, ti) => ti).map(
                (ti) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveImg(ti),
                    "aria-label": `View image ${ti + 1}`,
                    className: `h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeImg === ti ? "border-primary shadow-sm" : "border-transparent opacity-70 hover:opacity-100"}`,
                    "data-ocid": `listing-detail.thumb.${ti + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageUrls[ti],
                        alt: `View ${ti + 1}`,
                        className: "h-full w-full object-cover"
                      }
                    )
                  },
                  `thumb-${ti}`
                )
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "flex-1 font-display text-2xl font-bold leading-tight text-foreground", children: listing.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "shrink-0 capitalize", children: listing.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-primary", children: price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-sm font-medium ${conditionClass}`,
                children: conditionLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "capitalize", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "mr-1 h-3 w-3" }),
              listing.category.replace(/([A-Z])/g, " $1").trim()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
              listing.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 shrink-0" }),
              Number(listing.viewCount).toLocaleString(),
              " views"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 shrink-0" }),
              formatDate(listing.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground", children: listing.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-4 shadow-sm",
              "data-ocid": "listing-detail.seller_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Seller" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: (sellerProfile == null ? void 0 : sellerProfile.avatarUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: sellerProfile.avatarUrl,
                      alt: sellerProfile.name,
                      className: "h-11 w-11 rounded-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold text-foreground", children: (sellerProfile == null ? void 0 : sellerProfile.name) ?? "SareeMart Seller" }),
                    (sellerProfile == null ? void 0 : sellerProfile.memberSince) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Member since",
                      " ",
                      formatMemberSince(sellerProfile.memberSince)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/profile/$id",
                      params: { id: String(listing.sellerId) },
                      className: "ml-auto shrink-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          "data-ocid": "listing-detail.seller_profile_button",
                          children: "View"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "lg",
              className: "w-full gap-2 text-base",
              onClick: handleContactSeller,
              "data-ocid": "listing-detail.contact_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
                " Contact Seller"
              ]
            }
          )
        ] })
      ] }),
      similarListings && similarListings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", "data-ocid": "listing-detail.similar_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 font-display text-xl font-bold text-foreground", children: "Similar Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: similarListings.slice(0, 6).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing: item, index: i }, String(item.id))) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: loginPromptOpen, onOpenChange: setLoginPromptOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "listing-detail.login_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-5 w-5 text-primary" }),
            " Sign in to message"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a free account or sign in to contact this seller and start a conversation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full",
                onClick: () => {
                  setLoginPromptOpen(false);
                  login();
                },
                "data-ocid": "listing-detail.login_confirm_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "mr-2 h-4 w-4" }),
                  " Sign in with Internet Identity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                className: "w-full",
                onClick: () => setLoginPromptOpen(false),
                "data-ocid": "listing-detail.login_cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ListingDetailPage
};
