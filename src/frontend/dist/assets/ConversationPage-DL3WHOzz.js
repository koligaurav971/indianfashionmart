import { c as createLucideIcon, k as useParams, u as useBackend, l as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, a as cn, g as MessageCircle } from "./index-Dr8JVVcG.js";
import { S as Skeleton, f as formatDistanceToNow } from "./formatDistanceToNow-DoGJs4S5.js";
import { A as ArrowLeft } from "./arrow-left-COh7_ffz.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const MAX_CHARS = 500;
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
function AuthGuard({ login }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-screen-sm px-4 py-20 text-center",
      "data-ocid": "conversation.auth_required",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-10 w-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Login Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "You need to login to view this conversation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: login,
            className: "inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors",
            "data-ocid": "conversation.login_button",
            children: "Login with Internet Identity"
          }
        )
      ]
    }
  );
}
function ListingInfoCard({ conv }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-3 mb-1 flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
        "#",
        String(conv.listingId)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [
      "Conversation #",
      String(conv.id)
    ] })
  ] });
}
function ConversationPage() {
  const { id } = useParams({ from: "/messages/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = reactExports.useState([]);
  const [conversation, setConversation] = reactExports.useState(
    null
  );
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [message, setMessage] = reactExports.useState("");
  const [isSending, setIsSending] = reactExports.useState(false);
  const [sendError, setSendError] = reactExports.useState("");
  const messagesEndRef = reactExports.useRef(null);
  const intervalRef = reactExports.useRef(null);
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
  const scrollToBottom = reactExports.useCallback(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, []);
  const fetchMessages = reactExports.useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const result = await actor.getMessages(
        BigInt(id),
        BigInt(0),
        BigInt(100)
      );
      setMessages(result.items);
    } catch {
    }
  }, [actor, isAuthenticated, id]);
  const fetchConversation = reactExports.useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const convResult = await actor.getConversations(BigInt(0), BigInt(50));
      const found = convResult.items.find((c) => String(c.id) === id);
      if (found) setConversation(found);
    } catch {
    }
  }, [actor, isAuthenticated, id]);
  reactExports.useEffect(() => {
    if (!isReady || !isAuthenticated) {
      setIsLoading(false);
      return;
    }
    const init = async () => {
      await Promise.all([fetchMessages(), fetchConversation()]);
      setIsLoading(false);
      try {
        await (actor == null ? void 0 : actor.markMessagesRead(BigInt(id)));
      } catch {
      }
    };
    init();
  }, [isReady, isAuthenticated, fetchMessages, fetchConversation, actor, id]);
  reactExports.useEffect(() => {
    if (!isReady || !isAuthenticated) return;
    intervalRef.current = setInterval(fetchMessages, 3e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReady, isAuthenticated, fetchMessages]);
  reactExports.useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages.length, scrollToBottom]);
  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !actor || isSending) return;
    setSendError("");
    setIsSending(true);
    try {
      const other = messages.find(
        (m) => m.senderId.toString() !== principalStr
      );
      let recipientId = other == null ? void 0 : other.senderId;
      if (!recipientId && conversation) {
        const isBuyer = conversation.buyerId.toString() === principalStr;
        recipientId = isBuyer ? conversation.sellerId : conversation.buyerId;
      }
      if (!recipientId) {
        setSendError("Cannot find recipient. Please try again.");
        return;
      }
      await actor.sendMessage({
        content: trimmed,
        listingId: (conversation == null ? void 0 : conversation.listingId) ?? BigInt(0),
        conversationId: BigInt(id),
        recipientId
      });
      setMessage("");
      await fetchMessages();
      scrollToBottom();
    } catch {
      setSendError("Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { login });
  }
  const charsLeft = MAX_CHARS - message.length;
  const isOverLimit = charsLeft < 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto flex max-w-screen-sm flex-col bg-background",
      style: { height: "calc(100dvh - 56px)" },
      "data-ocid": "conversation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border bg-card px-4 py-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/messages" }),
              "aria-label": "Back to messages",
              className: "rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
              "data-ocid": "conversation.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: conversation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-tight", children: conversation.buyerId.toString() === principalStr ? "Seller" : "Buyer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              "Listing #",
              String(conversation.listingId)
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
            "Conversation #",
            id
          ] }) }),
          conversation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0", children: getInitials(
            conversation.buyerId.toString() === principalStr ? conversation.sellerId.toString() : conversation.buyerId.toString()
          ) })
        ] }),
        conversation && /* @__PURE__ */ jsxRuntimeExports.jsx(ListingInfoCard, { conv: conversation }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3",
            "data-ocid": "conversation.messages_thread",
            children: [
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: Array.from({ length: 6 }, (_, idx) => idx).map((skIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "flex",
                    skIdx % 2 === 0 ? "justify-start" : "justify-end"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Skeleton,
                    {
                      className: cn(
                        "h-12 rounded-2xl",
                        skIdx % 2 === 0 ? "w-48" : "w-36"
                      )
                    }
                  )
                },
                skIdx
              )) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center gap-3 py-12 text-center",
                  "data-ocid": "conversation.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-8 w-8 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Start the conversation" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Send a message to get the conversation going." })
                  ]
                }
              ) : messages.map((msg, i) => {
                const isMine = msg.senderId.toString() === principalStr;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex items-end gap-2",
                      isMine ? "justify-end" : "justify-start"
                    ),
                    "data-ocid": `conversation.message.${i + 1}`,
                    children: [
                      !isMine && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground text-[10px] font-bold mb-1", children: getInitials(msg.senderId.toString()) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: cn(
                            "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                            isMine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-words leading-relaxed", children: msg.content }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: cn(
                                  "mt-1 text-[10px] opacity-60",
                                  isMine ? "text-right" : "text-left"
                                ),
                                children: formatTs(msg.sentAt)
                              }
                            )
                          ]
                        }
                      ),
                      isMine && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-1", children: getInitials(principalStr) })
                    ]
                  },
                  String(msg.id)
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
            ]
          }
        ),
        sendError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "px-4 pb-1 text-xs text-destructive",
            "data-ocid": "conversation.error_state",
            children: sendError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSend,
            className: "flex flex-col gap-1 border-t border-border bg-card px-3 pt-2 pb-3 flex-shrink-0",
            "data-ocid": "conversation.compose_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: message,
                    onChange: (e) => {
                      setSendError("");
                      setMessage(e.target.value);
                    },
                    onKeyDown: (e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    },
                    placeholder: "Type a message… (Enter to send)",
                    rows: 1,
                    maxLength: MAX_CHARS + 20,
                    "data-ocid": "conversation.message_input",
                    className: "w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[40px] max-h-32 overflow-y-auto",
                    style: {
                      height: "auto",
                      minHeight: "40px"
                    },
                    onInput: (e) => {
                      const el = e.currentTarget;
                      el.style.height = "auto";
                      el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSending || !message.trim() || isOverLimit,
                    "aria-label": "Send message",
                    "data-ocid": "conversation.send_button",
                    className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                    children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-[10px]",
                    isOverLimit ? "text-destructive font-semibold" : charsLeft <= 50 ? "text-muted-foreground" : "text-transparent select-none"
                  ),
                  children: charsLeft
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
export {
  ConversationPage
};
