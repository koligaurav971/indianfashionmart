import { u as useBackend, l as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, g as MessageCircle, L as Link } from "./index-Dr8JVVcG.js";
import { E as EmptyState } from "./EmptyState-IDONVZ2G.js";
import { S as Skeleton, f as formatDistanceToNow } from "./formatDistanceToNow-DoGJs4S5.js";
import "./package-search-BPFiuX8y.js";
function formatTs(ts) {
  try {
    return formatDistanceToNow(new Date(Number(ts / BigInt(1e6))), {
      addSuffix: true
    });
  } catch {
    return "";
  }
}
function getInitials(id) {
  return id.slice(0, 2).toUpperCase();
}
function ConvSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-full flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-14" })
  ] });
}
function ConvRow({
  conv,
  index,
  principalStr
}) {
  const isBuyer = conv.buyerId.toString() === principalStr;
  const otherId = isBuyer ? conv.sellerId.toString() : conv.buyerId.toString();
  const unread = isBuyer ? Number(conv.unreadCountBuyer) : Number(conv.unreadCountSeller);
  const initials = getInitials(otherId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/messages/$id",
      params: { id: String(conv.id) },
      "data-ocid": `messages.item.${index}`,
      className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted/40 active:scale-[0.99] transition-all duration-150",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm select-none", children: initials }),
          unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold", children: unread > 9 ? "9+" : unread })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-sm font-semibold truncate ${unread > 0 ? "text-foreground" : "text-muted-foreground"}`,
                children: [
                  isBuyer ? "Seller" : "Buyer",
                  " · Listing #",
                  String(conv.listingId)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground flex-shrink-0", children: formatTs(conv.lastMessageAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-xs truncate mt-0.5 ${unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`,
              children: [
                "Conversation #",
                String(conv.id)
              ]
            }
          )
        ] })
      ]
    }
  );
}
function MessagesPage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const intervalRef = reactExports.useRef(null);
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
  const fetchConversations = reactExports.useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const result = await actor.getConversations(BigInt(0), BigInt(50));
      setConversations(result.items);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [actor, isAuthenticated]);
  reactExports.useEffect(() => {
    if (!isReady || !isAuthenticated) {
      setIsLoading(false);
      return;
    }
    fetchConversations();
    intervalRef.current = setInterval(fetchConversations, 5e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReady, isAuthenticated, fetchConversations]);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-screen-sm px-4 py-20 text-center",
        "data-ocid": "messages.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Your Messages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Login to view your conversations with sellers and buyers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: login,
              className: "inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors",
              "data-ocid": "messages.login_button",
              children: "Login with Internet Identity"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-screen-sm px-4 py-6",
      "data-ocid": "messages.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-1", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your conversations with buyers and sellers" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: Array.from({ length: 5 }, (_, idx) => idx).map((skIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConvSkeleton, {}, skIdx)) }) : conversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            variant: "empty",
            title: "No messages yet",
            description: "Browse listings and contact a seller to start chatting.",
            action: {
              label: "Browse Listings",
              onClick: () => navigate({ to: "/listings" })
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "messages.list", children: conversations.map((conv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConvRow,
          {
            conv,
            index: i + 1,
            principalStr
          },
          String(conv.id)
        )) })
      ]
    }
  );
}
export {
  MessagesPage
};
