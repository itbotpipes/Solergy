import type { Metadata, Viewport } from "next";
import SiteShell from "@/components/shared/SiteShell";
import "./globals.scss";

export const viewport: Viewport = {
  themeColor: "#ec4d00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://solergyindia.com"
  ),
  title: {
    template: "%s | Solergy India",
    default: "Solergy — Solar Energy Solutions in Gujarat & North India",
  },
  description:
    "Solergy designs, installs, and maintains premium rooftop and ground-mounted solar power systems for homes, businesses, and industrial units.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div id="root">
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}
