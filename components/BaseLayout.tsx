import {Footer, Header, OuterContainer} from "@/components";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Inter_Tight, Vazirmatn} from "next/font/google";
import {ReactNode} from "react";

/**
 * Setup font.
 *
 */
const interTight = Inter_Tight({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"]
});

const vazirmatn = Vazirmatn({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["arabic"]
});

type BaseLayoutProps = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: BaseLayoutProps) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="lofi" dir={locale === "fa" ? "rtl" : "ltr"}>
      <body
        className={`${locale === "en" ? interTight.className : vazirmatn.className} bg-brand-50`}
      >
        <NextIntlClientProvider messages={messages}>
          <OuterContainer>
            <Header />
            <main className="min-h-screen grow">{children}</main>
            <Footer />
          </OuterContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
