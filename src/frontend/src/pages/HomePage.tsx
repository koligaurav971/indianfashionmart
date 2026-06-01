import { CategoryCard } from "@/components/CategoryCard";
import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBackend } from "@/hooks/useBackend";
import { ListingCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Gem,
  Home,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  Search,
  Shirt,
  ShoppingBag,
  Sofa,
  Tv,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CITIES = [
  "All India",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
];

const categories: {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    label: "Sarees",
    value: ListingCategory.sarees,
    icon: Shirt,
    color: "bg-primary/15 text-primary",
  },
  {
    label: "Clothing",
    value: ListingCategory.kurtis,
    icon: ShoppingBag,
    color: "bg-accent/15 text-accent",
  },
  {
    label: "Electronics",
    value: ListingCategory.other,
    icon: Tv,
    color: "bg-chart-1/20 text-chart-1",
  },
  {
    label: "Furniture",
    value: ListingCategory.other,
    icon: Sofa,
    color: "bg-chart-2/20 text-chart-2",
  },
  {
    label: "Books",
    value: ListingCategory.other,
    icon: BookOpen,
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    label: "Toys",
    value: ListingCategory.other,
    icon: Gem,
    color: "bg-chart-5/20 text-chart-5",
  },
  {
    label: "Household",
    value: ListingCategory.other,
    icon: Home,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    label: "Other",
    value: ListingCategory.other,
    icon: Package,
    color: "bg-muted text-muted-foreground",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Layers,
    title: "Post Your Item",
    description:
      "List your pre-loved sarees, clothing, or household items in minutes. Upload photos, set your price, and reach thousands of buyers.",
  },
  {
    step: "02",
    icon: Search,
    title: "Browse Listings",
    description:
      "Discover unique finds at unbeatable prices. Filter by category, location, condition, and price range to find exactly what you need.",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Contact Seller",
    description:
      "Connect directly with sellers through our secure messaging. Negotiate, ask questions, and close the deal safely.",
  },
];

export function HomePage() {
  const { actor, isReady } = useBackend();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All India");

  const { data: featured, isLoading } = useQuery({
    queryKey: ["featured-listings"],
    queryFn: async () => actor?.getFeaturedListings(BigInt(0), BigInt(8)),
    enabled: isReady,
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/search",
      search: {
        keyword: searchQuery || undefined,
        location: selectedCity === "All India" ? undefined : selectedCity,
        category: undefined,
        condition: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: undefined,
      },
    });
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-saree-marketplace.dim_1400x560.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-14 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <CheckCircle className="h-3.5 w-3.5" />
              India&apos;s Trusted Marketplace
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Buy &amp; Sell <span className="text-primary">Anything</span>
            </h1>
            <p className="mt-4 text-base text-foreground/80 md:text-lg max-w-md">
              From pre-loved sarees to electronics — find great deals near you
              or turn your unused items into cash.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            data-ocid="home.search_form"
          >
            {/* Location selector */}
            <div className="relative flex-shrink-0">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-12 w-full rounded-lg border border-input bg-card pl-9 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-44 appearance-none cursor-pointer"
                data-ocid="home.location_select"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for sarees, electronics, furniture…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 pr-4 text-sm bg-card border-input focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="home.search_input"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 font-semibold shrink-0"
              data-ocid="home.search_button"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link to="/listings">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 bg-card/80 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                data-ocid="home.explore_button"
              >
                Explore Collection
              </Button>
            </Link>
            <Link to="/sell">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="home.sell_button"
              >
                Start Selling
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-12"
        data-ocid="home.categories_section"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Shop by Category
              </h2>
              <div className="mt-1.5 h-1 w-12 rounded-full bg-primary" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <CategoryCard {...cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Listings ────────────────────────────────────── */}
      <section
        className="bg-background py-12"
        data-ocid="home.featured_section"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Featured Listings
              </h2>
              <div className="mt-1.5 h-1 w-12 rounded-full bg-accent" />
            </div>
            <Link
              to="/listings"
              className="text-sm font-medium text-primary hover:underline transition-colors"
              data-ocid="home.view_all_link"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              data-ocid="home.featured.loading_state"
            >
              <LoadingSkeleton variant="card" count={8} className="contents" />
            </div>
          ) : !featured?.items?.length ? (
            <EmptyState
              title="No listings yet"
              description="Be the first to list your saree or ethnic wear!"
              action={{
                label: "Sell Now",
                onClick: () => navigate({ to: "/sell" }),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {featured.items.map((listing, i) => (
                <motion.div
                  key={String(listing.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <ListingCard listing={listing} index={i} className="h-full" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section
        className="bg-primary/8 border-t border-primary/10 py-14"
        data-ocid="home.how_it_works_section"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              How It Works
            </h2>
            <div className="mx-auto mt-1.5 h-1 w-12 rounded-full bg-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              Three simple steps to buy or sell anything
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map(({ step, icon: Icon, title, description }, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="relative flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-xs"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  Step {step}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <section
        className="bg-card border-t border-border py-8"
        data-ocid="home.stats_section"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { num: "50,000+", label: "Active Listings" },
              { num: "25,000+", label: "Happy Sellers" },
              { num: "8 Cities", label: "Pan India Reach" },
              { num: "100%", label: "Trusted Platform" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-display text-2xl font-bold text-primary md:text-3xl">
                  {num}
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
