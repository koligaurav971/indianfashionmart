import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      <footer className="border-t border-border bg-card mt-8">
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Brand */}
            <div>
              <p className="font-display text-lg font-bold text-primary">
                SareeMart
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                India&apos;s marketplace for pre-loved ethnic wear
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link
                to="/"
                className="hover:text-foreground transition-colors duration-200"
                data-ocid="footer.home_link"
              >
                About Us
              </Link>
              <Link
                to="/"
                className="hover:text-foreground transition-colors duration-200"
                data-ocid="footer.contact_link"
              >
                Contact
              </Link>
              <Link
                to="/"
                className="hover:text-foreground transition-colors duration-200"
                data-ocid="footer.faq_link"
              >
                FAQ
              </Link>
              <Link
                to="/"
                className="hover:text-foreground transition-colors duration-200"
                data-ocid="footer.terms_link"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/"
                className="hover:text-foreground transition-colors duration-200"
                data-ocid="footer.privacy_link"
              >
                Privacy Policy
              </Link>
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid="footer.social.x"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid="footer.social.facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid="footer.social.instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid="footer.social.youtube"
              >
                <SiYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
            <span>Copyright &copy; {year} SareeMart</span>
            <span>
              Built with love using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      <BottomNav />
      <Toaster />
    </div>
  );
}
