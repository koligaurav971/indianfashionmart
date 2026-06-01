import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, MessageCircle, PlusSquare, Search, User } from "lucide-react";

function MessagesUnreadDot() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  const { data: count } = useQuery({
    queryKey: ["unread-count"],
    queryFn: async () => (actor ? actor.getUnreadCount() : BigInt(0)),
    enabled: isReady && isAuthenticated,
    refetchInterval: 5000,
  });
  const num = Number(count ?? 0);
  if (!num) return null;
  return (
    <span className="absolute top-0 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold px-1">
      {num > 99 ? "99+" : num}
    </span>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: Home, ocid: "bottom-nav.home" },
  { to: "/search", label: "Search", icon: Search, ocid: "bottom-nav.search" },
  {
    to: "/sell",
    label: "Sell",
    icon: PlusSquare,
    ocid: "bottom-nav.sell",
    highlight: true,
  },
  {
    to: "/messages",
    label: "Messages",
    icon: MessageCircle,
    ocid: "bottom-nav.messages",
    hasUnread: true,
  },
  { to: "/profile", label: "Profile", icon: User, ocid: "bottom-nav.profile" },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex h-16 items-center">
        {tabs.map(({ to, label, icon: Icon, ocid, highlight, hasUnread }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
                highlight && "relative",
              )}
            >
              {highlight ? (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md -mt-5">
                  <Icon className="h-5 w-5" />
                </span>
              ) : (
                <span className="relative">
                  <Icon
                    className={cn("h-5 w-5", isActive && "fill-primary/20")}
                  />
                  {hasUnread && <MessagesUnreadDot />}
                </span>
              )}
              {!highlight && <span>{label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
