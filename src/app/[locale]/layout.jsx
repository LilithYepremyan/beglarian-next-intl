import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "./provider";

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body style={{ backgroundColor: "#F7F8FC" }}>
        <NextIntlClientProvider locale={locale}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );  
}


