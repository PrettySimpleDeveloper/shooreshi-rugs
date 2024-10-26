// import getMenuBySlug from '@/lib/queries/getMenuBySlug'
"use client";
import {Link} from "@/i18n/routing";
import {navLink} from "@/lib/types";
import {useTranslations} from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

const menuItems: navLink[] = [
  {databaseId: crypto.randomUUID(), uri: "/about-us", label: "About"},
  {databaseId: crypto.randomUUID(), uri: "/contact-us", label: "Contact"},
  {databaseId: crypto.randomUUID(), uri: "/blog", label: "Blog"},
  {databaseId: crypto.randomUUID(), uri: "/rugs", label: "Rugs"}
];
/**
 * Header component.
 */
export default function Header() {
  // const {locale: activeLocale, locales, asPath} = useRouter();
  // const menu = await getMenuBySlug('header')

  const t = useTranslations("Navigation");

  return (
    <header>
      <div className="drawer drawer-end z-top">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-transparent container px-4 mx-auto h-navbar">
            {/* navbar togle */}
            <div className="flex-none order-last lg:hidden">
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 ">
              <Link
                href="/"
                className=" text-xl inline-flex h-12 shrink-0 cursor-pointer"
              >
                <Logo variant="simple" />
              </Link>
            </div>
            <div className="hidden flex-none lg:block ">
              <ul className="menu items-center gap-4 menu-horizontal">
                {/* Navbar menu content here */}
                {!!menuItems &&
                  menuItems.map((item) => (
                    <li key={item.databaseId}>
                      <Link className="h-12 min-h-12 leading-8" href={item.uri}>
                        {t(item.label)}
                      </Link>
                    </li>
                  ))}

                <li>
                  <LocaleSwitcher />
                </li>

                {/* <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                       {locales.map((locale) => (
                        <li key={locale}>
                          <Link
                            href={asPath}
                            locale={locale}
                            className="text-base-content"
                          >
                            {locale.toUpperCase()}
                          </Link>
                        </li>
                      ))} 
                    </ul>
                  </details>
                </li>*/}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {/* Content */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {!!menuItems &&
              menuItems.map((item) => (
                <MenuItem key={item.databaseId} item={item} />
              ))}

            <li>
              <LocaleSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
