import {BaseLayout} from "@/components";
import {routing} from "@/i18n/routing";
import config from "@/lib/config";
import type {Metadata, Viewport} from "next";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

// Generate segments for [locale]
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale: locale
  }));
}

/**
 * Setup metadata.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
};

/**
 * Setup viewport.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  // colorScheme: "only light"
  // themeColor: "#dedede"
  // themeColor: "#18181b"
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {locale: string};
};

/**
 * Root layout component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default async function LocaleLayout({
  children,
  params: {locale}
}: RootLayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
