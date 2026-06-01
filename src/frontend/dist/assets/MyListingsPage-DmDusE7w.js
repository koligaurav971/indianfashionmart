import { c as createLucideIcon, u as useBackend, l as useAuth, b as useNavigate, o as useQueryClient, r as reactExports, d as useQuery, j as jsxRuntimeExports, U as User, B as Button, w as ListingStatus, L as Link, f as LoadingSkeleton, h as Badge, M as MapPin, p as ue } from "./index-Dr8JVVcG.js";
import { E as EmptyState } from "./EmptyState-IDONVZ2G.js";
import { E as Eye, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DGrlBAaK.js";
import { u as useMutation } from "./useMutation-DtNsHiZV.js";
import { P as Package } from "./package-DVzuDw11.js";
import { C as Calendar } from "./calendar-DoNsdozq.js";
import { P as Pen } from "./pen-BWEVPcJD.js";
import "./package-search-BPFiuX8y.js";
import "./index-Dec0p2H1.js";
import "./index-D_V4n8IO.js";
import "./index-Cm6drL5V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function MyListingRow({
  listing,
  index,
  onDelete
}) {
  var _a;
  const imageUrl = ((_a = listing.images[0]) == null ? void 0 : _a.getDirectURL()) ?? "/assets/images/placeholder.svg";
  const price = `₹ ${Number(listing.price).toLocaleString("en-IN")}`;
  const postedDate = new Date(
    Number(listing.createdAt / BigInt(1e6))
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const isActive = listing.status === ListingStatus.active;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors",
      "data-ocid": `my-listings.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/listings/$id",
            params: { id: String(listing.id) },
            className: "flex-shrink-0 group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: listing.title,
                className: "h-24 w-24 rounded-lg object-cover ring-1 ring-border group-hover:ring-primary/40 transition-all duration-200"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/listings/$id",
                params: { id: String(listing.id) },
                className: "font-semibold text-foreground hover:text-primary transition-colors truncate",
                children: listing.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: isActive ? "default" : "secondary",
                className: `flex-shrink-0 text-xs ${isActive ? "bg-accent/15 text-accent border-accent/30 hover:bg-accent/15" : "bg-muted text-muted-foreground"}`,
                "data-ocid": `my-listings.status_badge.${index + 1}`,
                children: isActive ? "Active" : "Expired"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-base", children: price }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              listing.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              String(listing.viewCount),
              " views"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3 w-3" }),
              "0 messages"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              postedDate
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0 justify-start pt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", search: { edit: String(listing.id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 gap-1.5 text-xs",
              "data-ocid": `my-listings.edit_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
                "Edit"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground",
              onClick: onDelete,
              "data-ocid": `my-listings.delete_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Delete"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function MyListingsPage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["my-listings-page"],
    queryFn: async () => principal && actor ? actor.getListingsBySeller(principal, BigInt(0), BigInt(50)) : null,
    enabled: isReady && isAuthenticated && !!principal
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => actor == null ? void 0 : actor.deleteListing(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-listings-page"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
      setDeleteTarget(null);
      ue.success("Listing deleted.");
    },
    onError: () => ue.error("Failed to delete listing.")
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-screen-sm px-4 py-16 text-center",
        "data-ocid": "my-listings.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "My Listings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Login to manage your listings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "my-listings.login_button", children: "Login with Internet Identity" })
        ]
      }
    );
  }
  const items = (data == null ? void 0 : data.items) ?? [];
  const activeCount = items.filter(
    (l) => l.status === ListingStatus.active
  ).length;
  const expiredCount = items.length - activeCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-screen-md px-4 py-8",
        "data-ocid": "my-listings.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Listings" }),
              items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                activeCount,
                " active · ",
                expiredCount,
                " expired"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "my-listings.add_button", className: "gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
              "Post New Item"
            ] }) })
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 grid grid-cols-3 gap-3", children: [
            { label: "Total", value: items.length, icon: Package },
            { label: "Active", value: activeCount, icon: Eye },
            {
              label: "Views",
              value: items.reduce((s, l) => s + Number(l.viewCount), 0),
              icon: User
            }
          ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border border-border bg-card p-3 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary mx-auto mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg leading-none", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
              ]
            },
            label
          )) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoadingSkeleton,
            {
              variant: "list",
              count: 4,
              className: "flex flex-col gap-4"
            }
          ) }) : !items.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              title: "No listings yet. Start selling!",
              description: "Post your sarees, kurtis, or ethnic wear and reach thousands of buyers.",
              action: {
                label: "Post Your First Item",
                onClick: () => navigate({ to: "/sell" })
              },
              "data-ocid": "my-listings.empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "my-listings.list", children: items.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MyListingRow,
            {
              listing,
              index: i,
              onDelete: () => setDeleteTarget(listing)
            },
            String(listing.id)
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "my-listings.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Listing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "“",
                deleteTarget == null ? void 0 : deleteTarget.title,
                "”"
              ] }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setDeleteTarget(null),
                "data-ocid": "my-listings.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                disabled: deleteMutation.isPending,
                "data-ocid": "my-listings.confirm_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
                  deleteMutation.isPending ? "Deleting..." : "Delete Listing"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  MyListingsPage
};
