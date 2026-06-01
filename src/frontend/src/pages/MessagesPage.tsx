import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import type { ConversationPublic } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

function ConvSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
      <Skeleton className="h-11 w-11 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-3 w-14" />
    </div>
  );
}

function ConvRow({
  conv,
  index,
  principalStr,
}: {
  conv: ConversationPublic;
  index: number;
  principalStr: string;
}) {
  const isBuyer = conv.buyerId.toString() === principalStr;
  const otherId = isBuyer ? conv.sellerId.toString() : conv.buyerId.toString();
  const unread = isBuyer
    ? Number(conv.unreadCountBuyer)
    : Number(conv.unreadCountSeller);
  const initials = getInitials(otherId);

  return (
    <Link
      to="/messages/$id"
      params={{ id: String(conv.id) }}
      data-ocid={`messages.item.${index}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted/40 active:scale-[0.99] transition-all duration-150"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm select-none">
          {initials}
        </div>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={`text-sm font-semibold truncate ${
              unread > 0 ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {isBuyer ? "Seller" : "Buyer"} · Listing #{String(conv.listingId)}
          </p>
          <span className="text-[11px] text-muted-foreground flex-shrink-0">
            {formatTs(conv.lastMessageAt)}
          </span>
        </div>
        <p
          className={`text-xs truncate mt-0.5 ${
            unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
          }`}
        >
          Conversation #{String(conv.id)}
        </p>
      </div>
    </Link>
  );
}

export function MessagesPage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login, principal } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationPublic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const principalStr = principal?.toString() ?? "";

  const fetchConversations = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const result = await actor.getConversations(BigInt(0), BigInt(50));
      setConversations(result.items);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }, [actor, isAuthenticated]);

  useEffect(() => {
    if (!isReady || !isAuthenticated) {
      setIsLoading(false);
      return;
    }
    fetchConversations();
    intervalRef.current = setInterval(fetchConversations, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReady, isAuthenticated, fetchConversations]);

  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto max-w-screen-sm px-4 py-20 text-center"
        data-ocid="messages.auth_required"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6">
          <MessageCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Your Messages
        </h2>
        <p className="text-muted-foreground mb-8">
          Login to view your conversations with sellers and buyers.
        </p>
        <button
          type="button"
          onClick={login}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          data-ocid="messages.login_button"
        >
          Login with Internet Identity
        </button>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-screen-sm px-4 py-6"
      data-ocid="messages.page"
    >
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">
        Messages
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Your conversations with buyers and sellers
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, idx) => idx).map((skIdx) => (
            <ConvSkeleton key={skIdx} />
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <EmptyState
          variant="empty"
          title="No messages yet"
          description="Browse listings and contact a seller to start chatting."
          action={{
            label: "Browse Listings",
            onClick: () => navigate({ to: "/listings" }),
          }}
        />
      ) : (
        <div className="flex flex-col gap-2" data-ocid="messages.list">
          {conversations.map((conv, i) => (
            <ConvRow
              key={String(conv.id)}
              conv={conv}
              index={i + 1}
              principalStr={principalStr}
            />
          ))}
        </div>
      )}
    </div>
  );
}
