import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useDarkMode } from "@/hooks/useDarkMode";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Search,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const locations = [
  "All India",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Jaipur",
];

function UnreadBadge() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  const { data: count } = useQuery({
    queryKey: ["unread-count"],
    queryFn: async () => (actor ? actor.getUnreadCount() : BigInt(0)),
    enabled: isReady && isAuthenticated,
    refetchInterval: 30000,
  });
  const num = Number(count ?? 0);
  if (!num) return null;
  return (
    <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 py-0 text-[10px] font-bold bg-destructive text-destructive-foreground border-0">
      {num > 99 ? "99+" : num}
    </Badge>
  );
}

export function Header() {
  const { isDark, toggle } = useDarkMode();
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All India");
  const [locOpen, setLocOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/search",
      search: {
        keyword: query || undefined,
        location: location !== "All India" ? location : undefined,
        category: undefined,
        condition: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: undefined,
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card shadow-xs">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-3 px-4">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="header.logo"
          className="flex-shrink-0 font-display text-xl font-bold text-primary"
        >
          SareeMart
        </Link>

        {/* Location selector — desktop */}
        <div className="relative hidden md:flex flex-shrink-0">
          <button
            type="button"
            data-ocid="header.location_select"
            onClick={() => setLocOpen((v) => !v)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="max-w-20 truncate">{location}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {locOpen && (
            <div className="absolute top-full left-0 mt-1 z-50 w-40 rounded-lg border border-border bg-popover shadow-md">
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setLocation(loc);
                    setLocOpen(false);
                  }}
                  className={cn(
                    "block w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors duration-150",
                    loc === location && "text-primary font-medium",
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search bar — desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 md:flex items-center gap-0"
        >
          <div className="relative flex-1">
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for sarees, styles, or sellers..."
              data-ocid="header.search_input"
              className="pr-4 rounded-r-none border-r-0 bg-background"
            />
          </div>
          <Button
            type="submit"
            data-ocid="header.search_button"
            className="rounded-l-none flex-shrink-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile search toggle */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen((v) => !v)}
          data-ocid="header.mobile_search_toggle"
          className="ml-auto md:hidden text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle search"
        >
          {mobileSearchOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggle}
            data-ocid="header.dark_mode_toggle"
            aria-label="Toggle dark mode"
            className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Messages bell */}
          <Link
            to="/messages"
            data-ocid="header.messages_button"
            className="relative rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            aria-label="Messages"
          >
            <Bell className="h-4 w-4" />
            <UnreadBadge />
          </Link>

          {/* Sell button — desktop */}
          <Link
            to="/sell"
            data-ocid="header.sell_button"
            className="hidden md:flex"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              + Sell
            </Button>
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              <Link
                to="/profile"
                data-ocid="header.profile_link"
                className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={logout}
                data-ocid="header.logout_button"
                aria-label="Logout"
                className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              data-ocid="header.login_button"
              className="flex items-center gap-1"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="border-t border-border bg-card px-4 py-2 md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, lehengas, kurtis..."
              data-ocid="header.mobile_search_input"
              autoFocus
              className="flex-1 bg-background"
            />
            <Button
              type="submit"
              size="sm"
              data-ocid="header.mobile_search_submit"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
