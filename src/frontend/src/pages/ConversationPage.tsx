import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type { ConversationPublic, MessagePublic } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_CHARS = 500;

function formatTs(ts: bigint) {
  try {
    return formatDistanceToNow(new Date(Number(ts / BigInt(1_000_000))), {
      addSuffix: true,
    });
  } catch {
    return "";
  }
}

function getInitials(id: string) {
  return id.slice(0, 2).toUpperCase();
}

function AuthGuard({ login }: { login: () => void }) {
  return (
    <div
      className="mx-auto max-w-screen-sm px-4 py-20 text-center"
      data-ocid="conversation.auth_required"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6">
        <MessageCircle className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-3">
        Login Required
      </h2>
      <p className="text-muted-foreground mb-8">
        You need to login to view this conversation.
      </p>
      <button
        type="button"
        onClick={login}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        data-ocid="conversation.login_button"
      >
        Login with Internet Identity
      </button>
    </div>
  );
}

function ListingInfoCard({ conv }: { conv: ConversationPublic }) {
  return (
    <div className="mx-4 mt-3 mb-1 flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <MessageCircle className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">Listing</p>
        <p className="text-sm font-semibold text-foreground truncate">
          #{String(conv.listingId)}
        </p>
      </div>
      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        Conversation #{String(conv.id)}
      </span>
    </div>
  );
}

export function ConversationPage() {
  const { id } = useParams({ from: "/messages/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessagePublic[]>([]);
  const [conversation, setConversation] = useState<ConversationPublic | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const principalStr = principal?.toString() ?? "";

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const result = await actor.getMessages(
        BigInt(id),
        BigInt(0),
        BigInt(100),
      );
      setMessages(result.items);
    } catch {
      // silent
    }
  }, [actor, isAuthenticated, id]);

  const fetchConversation = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const convResult = await actor.getConversations(BigInt(0), BigInt(50));
      const found = convResult.items.find((c) => String(c.id) === id);
      if (found) setConversation(found);
    } catch {
      // silent
    }
  }, [actor, isAuthenticated, id]);

  // Initial load + mark as read
  useEffect(() => {
    if (!isReady || !isAuthenticated) {
      setIsLoading(false);
      return;
    }
    const init = async () => {
      await Promise.all([fetchMessages(), fetchConversation()]);
      setIsLoading(false);
      // Mark read
      try {
        await actor?.markMessagesRead(BigInt(id));
      } catch {
        // silent
      }
    };
    init();
  }, [isReady, isAuthenticated, fetchMessages, fetchConversation, actor, id]);

  // Poll every 3 seconds
  useEffect(() => {
    if (!isReady || !isAuthenticated) return;
    intervalRef.current = setInterval(fetchMessages, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReady, isAuthenticated, fetchMessages]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages.length, scrollToBottom]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !actor || isSending) return;
    setSendError("");
    setIsSending(true);

    try {
      // Find the other user's principal from existing messages
      const other = messages.find(
        (m) => m.senderId.toString() !== principalStr,
      );
      // Fallback: use conversation seller/buyer
      let recipientId = other?.senderId;
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
        listingId: conversation?.listingId ?? BigInt(0),
        conversationId: BigInt(id),
        recipientId,
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
    return <AuthGuard login={login} />;
  }

  const charsLeft = MAX_CHARS - message.length;
  const isOverLimit = charsLeft < 0;

  return (
    <div
      className="mx-auto flex max-w-screen-sm flex-col bg-background"
      style={{ height: "calc(100dvh - 56px)" }}
      data-ocid="conversation.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate({ to: "/messages" })}
          aria-label="Back to messages"
          className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          data-ocid="conversation.back_button"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          {conversation ? (
            <>
              <p className="font-semibold text-foreground text-sm leading-tight">
                {conversation.buyerId.toString() === principalStr
                  ? "Seller"
                  : "Buyer"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Listing #{String(conversation.listingId)}
              </p>
            </>
          ) : (
            <p className="font-semibold text-foreground">Conversation #{id}</p>
          )}
        </div>
        {conversation && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
            {getInitials(
              conversation.buyerId.toString() === principalStr
                ? conversation.sellerId.toString()
                : conversation.buyerId.toString(),
            )}
          </div>
        )}
      </div>

      {/* Listing info card */}
      {conversation && <ListingInfoCard conv={conversation} />}

      {/* Messages thread */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
        data-ocid="conversation.messages_thread"
      >
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }, (_, idx) => idx).map((skIdx) => (
              <div
                key={skIdx}
                className={cn(
                  "flex",
                  skIdx % 2 === 0 ? "justify-start" : "justify-end",
                )}
              >
                <Skeleton
                  className={cn(
                    "h-12 rounded-2xl",
                    skIdx % 2 === 0 ? "w-48" : "w-36",
                  )}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-3 py-12 text-center"
            data-ocid="conversation.empty_state"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Start the conversation
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Send a message to get the conversation going.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMine = msg.senderId.toString() === principalStr;
            return (
              <div
                key={String(msg.id)}
                className={cn(
                  "flex items-end gap-2",
                  isMine ? "justify-end" : "justify-start",
                )}
                data-ocid={`conversation.message.${i + 1}`}
              >
                {/* Other avatar */}
                {!isMine && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-foreground text-[10px] font-bold mb-1">
                    {getInitials(msg.senderId.toString())}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                    isMine
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border text-foreground rounded-bl-sm",
                  )}
                >
                  <p className="break-words leading-relaxed">{msg.content}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px] opacity-60",
                      isMine ? "text-right" : "text-left",
                    )}
                  >
                    {formatTs(msg.sentAt)}
                  </p>
                </div>
                {/* My avatar */}
                {isMine && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-1">
                    {getInitials(principalStr)}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Send error */}
      {sendError && (
        <p
          className="px-4 pb-1 text-xs text-destructive"
          data-ocid="conversation.error_state"
        >
          {sendError}
        </p>
      )}

      {/* Compose box */}
      <form
        onSubmit={handleSend}
        className="flex flex-col gap-1 border-t border-border bg-card px-3 pt-2 pb-3 flex-shrink-0"
        data-ocid="conversation.compose_form"
      >
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => {
                setSendError("");
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e as unknown as React.FormEvent);
                }
              }}
              placeholder="Type a message… (Enter to send)"
              rows={1}
              maxLength={MAX_CHARS + 20}
              data-ocid="conversation.message_input"
              className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[40px] max-h-32 overflow-y-auto"
              style={{
                height: "auto",
                minHeight: "40px",
              }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSending || !message.trim() || isOverLimit}
            aria-label="Send message"
            data-ocid="conversation.send_button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        {/* Character counter */}
        <div className="flex justify-end pr-1">
          <span
            className={cn(
              "text-[10px]",
              isOverLimit
                ? "text-destructive font-semibold"
                : charsLeft <= 50
                  ? "text-muted-foreground"
                  : "text-transparent select-none",
            )}
          >
            {charsLeft}
          </span>
        </div>
      </form>
    </div>
  );
}
