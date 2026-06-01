import { Layout } from "@/components/Layout";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ListingsPage = lazy(() =>
  import("@/pages/ListingsPage").then((m) => ({ default: m.ListingsPage })),
);
const ListingDetailPage = lazy(() =>
  import("@/pages/ListingDetailPage").then((m) => ({
    default: m.ListingDetailPage,
  })),
);
const SellPage = lazy(() =>
  import("@/pages/SellPage").then((m) => ({ default: m.SellPage })),
);
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
const MessagesPage = lazy(() =>
  import("@/pages/MessagesPage").then((m) => ({ default: m.MessagesPage })),
);
const ConversationPage = lazy(() =>
  import("@/pages/ConversationPage").then((m) => ({
    default: m.ConversationPage,
  })),
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const PublicProfilePage = lazy(() =>
  import("@/pages/PublicProfilePage").then((m) => ({
    default: m.PublicProfilePage,
  })),
);
const MyListingsPage = lazy(() =>
  import("@/pages/MyListingsPage").then((m) => ({ default: m.MyListingsPage })),
);

function PageLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4">
      <LoadingSkeleton variant="card" count={8} className="contents" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings",
  component: ListingsPage,
});
const listingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings/$id",
  component: ListingDetailPage,
});
const sellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sell",
  component: SellPage,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, string>) => ({
    keyword: search.keyword as string | undefined,
    category: search.category as string | undefined,
    condition: search.condition as string | undefined,
    location: search.location as string | undefined,
    minPrice: search.minPrice as string | undefined,
    maxPrice: search.maxPrice as string | undefined,
    sort: search.sort as string | undefined,
  }),
  component: SearchPage,
});
const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: MessagesPage,
});
const conversationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages/$id",
  component: ConversationPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});
const publicProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$id",
  component: PublicProfilePage,
});
const myListingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-listings",
  component: MyListingsPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  listingsRoute,
  listingDetailRoute,
  sellRoute,
  searchRoute,
  messagesRoute,
  conversationRoute,
  profileRoute,
  publicProfileRoute,
  myListingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
