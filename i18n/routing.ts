import {createNavigation} from "next-intl/navigation";
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "en"
  // pathnames: {
  //   "/": "/",
  //   "/about-us": {
  //     en: "/about-us",
  //     fa: "/about-us"
  //   }
  // }
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createNavigation(routing);
